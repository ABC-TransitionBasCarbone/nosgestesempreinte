import ProfileIcon from '@/components/icons/ProfileIcon'
import { HIDE_CTA_PATHS } from '@/constants/urls'
import BurgerMenu from '@/design-system/layout/BurgerMenu'
import { useUser } from '@/publicodes-state'
import { usePathname } from 'next/navigation'
import NavLink from '../NavLink'
import OrganisationLink from '../_components/OrganisationLink'
import CTAButton from '../headerDesktop/CTAButton'

export default function FoldableMenu() {
  const { user } = useUser()

  const pathname = usePathname()

  return (
    <BurgerMenu>
      {({ closeMenu, onFocus }) => (
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              onFocus={onFocus}
              onClick={closeMenu}
              href="/profil"
              icon={ProfileIcon}>
              Profil
            </NavLink>
          </li>
          {user?.organisation?.administratorEmail && <OrganisationLink />}

          {!HIDE_CTA_PATHS.find((path) => pathname.includes(path)) &&
          !user?.organisation?.administratorEmail ? (
            <CTAButton />
          ) : null}

          <li>
            <div className="ml-2 h-[1px] w-4 bg-gray-400" />
          </li>

          <li>
            <NavLink onFocus={onFocus} onClick={closeMenu} href="/blog">
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink
              onFocus={onFocus}
              onClick={closeMenu}
              href="/questions-frequentes">
              FAQ
            </NavLink>
          </li>

          <li>
            <NavLink
              onFocus={onFocus}
              onClick={closeMenu}
              href="/documentation">
              Documentation
            </NavLink>
          </li>

          <li>
            <NavLink onFocus={onFocus} onClick={closeMenu} href="/diffuser">
              Diffuser Nos Gestes Climat
            </NavLink>
          </li>
        </ul>
      )}
    </BurgerMenu>
  )
}
