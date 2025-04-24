import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Smartphone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foodly-900 text-white">
      <div className="foodly-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-foodly-accent to-foodly-secondary bg-clip-text text-transparent">
                Foodly
              </span>
            </Link>
            <p className="text-foodly-300 mb-6">
              Makanan lezat yang diantarkan langsung ke depan pintu Anda.
              Pengantaran cepat, pemesanan mudah, dan berbagai pilihan restoran.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Useful Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-foodly-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurants"
                  className="text-foodly-300 hover:text-white transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-foodly-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-foodly-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-foodly-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-foodly-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-foodly-400" />
                <span className="text-foodly-300">
                  Mredo, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah
                  Istimewa Yogyakarta
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-foodly-400" />
                <a
                  href="mailto:info@foodly.com"
                  className="text-foodly-300 hover:text-white transition-colors">
                  alysafood@gmail.com
                </a>
              </li>
              <li className="flex">
                <Smartphone className="h-5 w-5 mr-3 text-foodly-400" />
                <a
                  href="tel:+1-555-123-4567"
                  className="text-foodly-300 hover:text-white transition-colors">
                  +6288980972922
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-foodly-300 mb-4">
              Berlangganan buletin kami dan dapatkan penawaran eksklusif yang
              tidak akan Anda temukan di di tempat lain.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/10 text-white placeholder:text-foodly-400 focus:border-foodly-accent"
              />
              <Button
                size="icon"
                className="bg-foodly-accent hover:bg-foodly-accent/90">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foodly-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Alysa Foodly. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/terms"
              className="text-foodly-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-foodly-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-foodly-400 hover:text-white text-sm transition-colors">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
