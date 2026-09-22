import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import AnimatedContainer from "./AnimatedContainer";

export default function Footer() {
  return (
    <footer className="border-t text-text-muted bg-background mt-14 pt-18 pb-6">
      <AnimatedContainer
        type='scroll'
        containerType='div'
        delay={0.3}
        className="page-wrap px-2">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <p className="text-sm font-semibold text-text-primary">
              © {new Date().getFullYear()} OmniBook Technologies.
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Built for professionals who organize knowledge.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-text-primary">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-text-primary">Features</a></li>
              <li><a href="#" className="hover:text-text-primary">Integration</a></li>
              <li><a href="#" className="hover:text-text-primary">Security</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-text-primary">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-text-primary">About</a></li>
              <li><a href="#" className="hover:text-text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-text-primary">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-text-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-text-primary">Terms</a></li>
              <li><a href="#" className="hover:text-text-primary">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row: theme toggle + social icons */}
        <div className="mt-12 flex items-center justify-between border-t border-border-default pt-8">
          {/* Social icons */}
          <div className="flex items-center gap-4 text-text-muted">
            <a href="#" aria-label="Twitter" className="hover:text-text-primary">
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-text-primary">
              <FaLinkedin className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-text-primary">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Email" className="hover:text-text-primary">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </AnimatedContainer>
    </footer>
  )
}
