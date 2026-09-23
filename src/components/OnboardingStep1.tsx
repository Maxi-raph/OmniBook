import AnimatedButton from '#/components/AnimatedButton'
import { useOnboarding } from '#/context/OnboardingContext'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Calendar, Globe, Info, Layers, Link, Upload } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * Step 1 of onboarding — "Business Info".
 *
 * This component holds the profile setup form: logo upload, tagline,
 * and the auto-generated booking link. It's rendered by the parent route
 * `_onboarding/onboarding.tsx` when no child step is active.
 *
 * All form values live in the OnboardingContext so they survive navigation
 * between steps. The only local state here is the logo preview URL and the
 * "link copied" toast — both are ephemeral UI state, not data to persist.
 */
export default function OnboardingPage() {
  // Router hook for navigating to the next onboarding step.
  const navigate = useNavigate()

  // Ref to the hidden <input type="file">. The "Choose File" button
  // triggers `.click()` on this ref to open the OS file picker.
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Temporary blob URL for the preview image. Created from the selected
  // File via URL.createObjectURL. Must be revoked on unmount to avoid
  // memory leaks.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Controls the "Link Copied" toast visibility when the user clicks
  // the booking link to copy it.
  const [linkCopied, setLinkCopied] = useState(false)

  // Shared onboarding state. `data` holds all values across all 3 steps.
  // `setData` merges partial updates into the existing state.
  const { data, setData, loading } = useOnboarding()

    // Navigate to the availability page.
   function handleNext() {
    navigate({ to: '/onboarding/availability' })
  }

  // When the component mounts, or when data.logoFile changes, ensure
  // the preview URL matches the file in context.
    useEffect(() => {
      if (data.logoFile) {
        const url = URL.createObjectURL(data.logoFile)
        setPreviewUrl(url)

        return () => {
          URL.revokeObjectURL(url)
        }
      } else {
        setPreviewUrl(null)
      }
    }, [data.logoFile])

  return (
    <div className="pt-6">
      {/* Page heading — tells the user what this step is for */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary lg:text-4xl">
          Tell us about your business
        </h2>
        <p className="mt-4 text-[14px] sm:text-lg text-text-muted">
          Let's customize your profile to match your professional brand.
        </p>
      </div>

      {/* Main card containing all Step 1 fields */}
      <div className="bg-surface-elevated max-w-4xl mx-auto mt-6 rounded-xl shadow-lg shadow-shadow-heavy py-6">
        <h3 className="text-xl px-6 font-bold">Profile Details</h3>
        <p className="text-sm px-6 text-text-muted">
          These details will be visible on your public booking page
        </p>

        {/* Divider between the card header and the form fields */}
        <hr className="text-text-muted w-full h-0.5 mt-4 mb-6" />

        {/* ---------- Logo upload section ---------- */}
        <p className="text-xs font-semibold px-6">Upload your logo</p>

        <div className="flex flex-wrap px-6 gap-6 mt-2">
          {/* Preview box — renders the selected logo, or an empty-state
              placeholder with an upload icon. */}
          {previewUrl ? (
            <div className="w-20 h-20 rounded-lg border border-text-muted gap-2 bg-surface">
              <img
                src={previewUrl}
                alt="Logo preview"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div
              className="w-20 h-20 text-text-muted text-xs rounded-lg flex flex-col
                border border-text-muted gap-2 items-center justify-center bg-surface"
            >
              <Upload className="shrink-0" size={14} />
              <p>'Empty'</p>
            </div>
          )}

          {/* Right-side: instructions, hidden file input, and trigger button */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-text-muted">
              Recommended size: 512px by 512px, SVG, PNG or JPEG. Max size 2MB.
            </p>

            {/* Invisible file input. Triggered programmatically by the
                "Choose File" button below. When a file is selected, we:
                1. Store the File in local state (for preview)
                2. Store the File in context (for the eventual upload)
                3. Create a blob URL for the preview image */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setData((prev) => ({ ...prev, logoFile: file }))
                }
              }}
            />

            {/* Trigger button — clicks the hidden input above.
                The file picker opens; the user selects a file;
                the input's onChange handler takes over. */}
            <AnimatedButton
              func={() => fileInputRef.current?.click()}
              classes="border border-text-muted py-1 px-2 rounded-lg cursor-pointer
                text-xs font-semibold w-fit bg-surface shadow-md shadow-shadow-light
                hover:bg-surface-elevated focus:border-surface-elevated
                active:border-surface-elevated"
            >
              Choose File
            </AnimatedButton>
          </div>
        </div>

        {/* ---------- Tagline input ---------- */}
        {/* Controlled input — value comes from context, onChange writes back.
            This way the tagline persists across step navigation and can be
            saved to Supabase in the final step. */}
        <div className="flex flex-col px-6 gap-2 mt-6">
          <label className="font-bold" htmlFor="tagline">
            Professional Tagline
          </label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={data.tagline}
            onChange={(e) =>
              setData((prev) => ({ ...prev, tagline: e.target.value }))
            }
            className="w-full h-11 px-4 rounded-xl border border-text-muted
              placeholder:text-text-muted placeholder:text-sm
              focus:border-accent-primary focus:outline-none
              focus:ring-2 focus:ring-accent-primary/20
              active:border-accent-primary"
            placeholder="e.g. Executive Career Coach for Tech Professionals"
          />
          <p className="text-xs text-text-muted">
            Keep it short and respectful. It appears under your name.
          </p>
        </div>

        {/* ---------- Booking link (copy to clipboard) ---------- */}
        {/* The slug was auto-generated during signup and stored on the
            organizations row. The context fetches it on mount, so this
            displays the user's actual booking URL. */}
        <div className="flex flex-col px-6 gap-2 mt-6">
          <p className="font-bold">Your booking link</p>

          <AnimatedButton
            func={() => {
              // Copy the full booking URL to the clipboard
              navigator.clipboard.writeText(`https://omnibook.com/${data.slug}`)
              // Show the toast
              setLinkCopied(true)
              // Hide it after 1 second
              setTimeout(() => setLinkCopied(false), 1000)
            }}
            classes="relative w-full h-11 flex justify-between items-center
              cursor-pointer rounded-xl bg-surface border border-text-muted
              text-text-muted px-3 py-2 shadow-lg shadow-shadow-light"
          >
            <div className="flex gap-2 items-center">
              <Globe className="shrink-0" size={14} />
              <span className="text-sm">{`omnibook.com/${data.slug}`}</span>
            </div>
            <Link className="shrink-0" size={14} />

            {/* Toast — fades in above the button when the link is copied.
                Uses absolute positioning relative to the parent button.
                The -top-5 / -top-2 shift and opacity change produce the
                slide-up + fade-in animation. */}
            <span
              className={`${
                linkCopied ? '-top-5 opacity-100' : '-top-2 opacity-0'
              } flex justify-center items-center transition-all duration-300
                absolute -right-2 bg-border-default h-8 rounded-lg
                border border-text-muted px-6 py-2 text-sm font-bold`}
            >
              Link Copied
            </span>
          </AnimatedButton>

          <p className="text-xs text-text-muted flex items-center gap-1 mt-2">
            <Info className="shrink-0 text-accent-hover" size={16} />
            This link is unique to you. You can share this directly with clients
            once you finish setup.
          </p>
        </div>
      </div>

      {/* ---------- Navigation ---------- */}
      <div className="mt-8 max-w-4xl mx-auto flex items-center justify-end">
        {/* Step 1 has no Back button — the user just signed up, so there's
            nowhere to go back to. Only "Next Step" is shown.
            The button just navigates — data is already in context. */}
        <AnimatedButton
          func={handleNext}
          classes="bg-accent-primary text-surface font-semibold text-sm
            flex justify-center items-center px-4 py-2 gap-2 rounded-xl
            cursor-pointer shadow-lg shadow-shadow-glow
            hover:bg-accent-hover focus:border-accent-hover
            active:border-accent-hover"
        >
          Next Step <ArrowRight className="shrink-0" size={14} />
        </AnimatedButton>
      </div>

      {/* Divider separating the form from the info cards below */}
      <hr className="text-text-muted max-w-4xl mx-auto h-0.5 mt-14 mb-14" />

      {/* Informational cards — set expectations for what happens next.
          Not interactive, just helpful context for the user. */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — teases the next step (availability) */}
        <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
          <Calendar className="shrink-0 mt-1 text-accent-hover" size={16} />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Calendar Sync</h3>
            <p className="text-xs text-text-muted">
              In the next step, you'll be able to connect Google or Outlook
              calendars.
            </p>
          </div>
        </div>

        {/* Card 2 — explains the brand consistency feature */}
        <div className="bg-surface-elevated flex gap-3 p-6 rounded-xl border border-border-default">
          <Layers className="shrink-0 mt-1 text-accent-hover" size={16} />
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Brand Consistency</h3>
            <p className="text-xs text-text-muted">
              Your logo and colors will be reflected on your public booking page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}