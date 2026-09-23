import { supabase } from './supabase'
import type { OnboardingData } from '#/context/OnboardingContext'

export async function saveOnboarding(data: OnboardingData): Promise<void> {
  // 1. Get the current user and their org
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: userRow, error: userError } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  if (userError) throw userError
  if (!userRow) throw new Error('User has no organization')

  const orgId = userRow.organization_id

  // 2. Upload the logo (if any)
  let logoUrl: string | null = null

  if (data.logoFile) {
    const ext = data.logoFile.name.split('.').pop() ?? 'png'
    const path = `${orgId}/logo.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('logos')
      .upload(path, data.logoFile, { upsert: true })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('logos')
      .getPublicUrl(path)

    logoUrl = urlData.publicUrl
  }

  // 3. Update the organization row
  const { error: orgError } = await supabase
    .from('organizations')
    .update({
      tagline: data.tagline || null,
      logo_url: logoUrl,
      timezone: data.timezone,
    })
    .eq('id', orgId)

  if (orgError) throw orgError

  // 4. Replace availability
  const { error: deleteError } = await supabase
    .from('availability')
    .delete()
    .eq('organization_id', orgId)

  if (deleteError) throw deleteError

  const availabilityRows = data.days.map((d, index) => ({
    organization_id: orgId,
    day_of_week: (index + 1) % 7,
    start_time: d.startTime,
    end_time: d.endTime,
    is_open: d.isOpen,
  }))

  const { error: availabilityError } = await supabase
    .from('availability')
    .insert(availabilityRows)

  if (availabilityError) throw availabilityError

  // 5. Insert services
  const serviceRows = data.services.map((s) => ({
    organization_id: orgId,
    name: s.name,
    description: s.description || null,
    duration_minutes: s.durationMinutes,
    price_cents: s.priceCents,
    is_active: true,
  }))

  const { error: servicesError } = await supabase
    .from('services')
    .insert(serviceRows)

  if (servicesError) throw servicesError

  // 6. Flip the onboarding flag (LAST)
  const { error: flagError } = await supabase
    .from('organizations')
    .update({ onboarding_completed: true })
    .eq('id', orgId)

  if (flagError) throw flagError
}