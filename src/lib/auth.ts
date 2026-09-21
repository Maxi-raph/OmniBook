import { supabase } from './supabase'

// ============================================
// SIGN UP
// ============================================
export async function signUp({
  fullName,
  email,
  password,
  businessName,
}: {
  fullName: string
  email: string
  password: string
  businessName: string
}) {
  // Step 1: Create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw new Error(authError.message)
  if (!authData.user) throw new Error('Signup failed — no user returned')

  const authUserId = authData.user.id

  // Step 2: Generate a slug from the business name
  const slug = businessName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  // Step 3: Detect timezone from the browser
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Step 4: Create the organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .insert({
      name: businessName,
      slug,
      timezone,
    })
    .select()
    .single()

  if (orgError) throw new Error(orgError.message)

  // Step 5: Create the user profile
  const { error: userError } = await supabase.from('users').insert({
    id: authUserId,
    organization_id: org.id,
    full_name: fullName,
    email,
  })

  if (userError) throw new Error(userError.message)

  return {
    userId: authUserId,
    organizationId: org.id,
    slug: org.slug,
  }
}

// ============================================
// SIGN IN 
// ============================================
export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  // Step 1: Authenticate with Supabase
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password })

  if (authError) throw new Error(authError.message)
  if (!authData.user) throw new Error('Login failed')

  // Step 2: Fetch the user's org to check onboarding status
  const { data: userRow, error: userError } = await supabase
    .from('users')
    .select('organization_id, organizations(onboarding_completed)')
    .eq('id', authData.user.id)
    .single()

  if (userError) throw new Error(userError.message)

  // Step 3: Extract the onboarding flag
  const org = Array.isArray(userRow.organizations)
    ? userRow.organizations[0]
    : userRow.organizations

  const onboardingCompleted = org?.onboarding_completed ?? false

  // Step 4: Return where they should go next
  return {
    user: authData.user,
    organizationId: userRow.organization_id,
    nextRoute: onboardingCompleted ? '/dashboard' : '/onboarding',
  }
}

// ============================================
// SIGN OUT
// ============================================
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

// ============================================
// GET CURRENT USER (for route guards)
// ============================================
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: userRow } = await supabase
    .from('users')
    .select('id, full_name, email, organization_id, organizations(id, name, slug, onboarding_completed)')
    .eq('id', user.id)
    .single()

  if (!userRow) return null

  const org = Array.isArray(userRow.organizations)
    ? userRow.organizations[0]
    : userRow.organizations

  return {
    id: user.id,
    email: userRow.email,
    fullName: userRow.full_name,
    organization: {
      id: org?.id,
      name: org?.name,
      slug: org?.slug,
      onboardingCompleted: org?.onboarding_completed,
    },
  }
}