"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import Image from "next/image"
import { useTriggerUseEffect } from "@/app/store"
import { type countersCartType, countersWishType } from "@/lib/types"
import LocaleSwitcher from "@/components/general/header/locale-switcher"
import AccessButtons from "@/components/general/header/access-buttons"

const Dropdown = ({ dictionary, isLoggedIn }: { dictionary: any, isLoggedIn: boolean }) => {

  return (
    <>
      <div className="header__upper__left__hamburger__dropdown">
        <div className="header__upper__left__hamburger__dropdown__content">
          <ul className="header__upper__left__hamburger__dropdown__ul">
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop`}>{dictionary["Header"]["all_products"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/pod_kirpich`}>{dictionary["Header"]["brick_slips"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/kirpich`}>{dictionary["Header"]["bricks"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/termopaneli_fasadnye`}>{dictionary["Header"]["thermopanels"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/kolpaki_dlya_zabora`}>{dictionary["Header"]["fence_caps"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/klinkernaya_bruschatka`}>{dictionary["Header"]["clay_pavers"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/klinkernye_stupeni`}>{dictionary["Header"]["stair_floor_tile"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/keramicheskie_podokonniki`}>{dictionary["Header"]["window_sills"]}</Link></li>
            <li className="header__upper__left__hamburger__dropdown__content__link"><Link className="header__upper__left__hamburger__dropdown__content__link__a" href={`/shop/stroitelnye_smesi`}>{dictionary["Header"]["mortar"]}</Link></li>
          </ul>
          <AccessButtons dictionary={dictionary} isLoggedIn={isLoggedIn} />
          {/* <LocaleSwitcher /> */}
        </div>
      </div>
    </>
  )
}

const Header = ({ dictionary, isLoggedIn }: { dictionary: any, isLoggedIn: boolean }) => {

  const trigger = useTriggerUseEffect(state => state.triggerUseEffect)

  // localStorage.removeItem('cart')
  // localStorage.removeItem('wishlist')

  const [headerUpperRight, setHeaderUpperRight] = useState("")
  const [headerUpperRightSaved, setHeaderUpperRightSaved] = useState("")

  const [savedCounter, setSavedCounter] = useState(0)
  const [cartCounter, setCartCounter] = useState(0)

  const [savedCounterStyle, setSavedCounterStyle] = useState("")
  const [cartCounterStyle, setCartCounterStyle] = useState("")

  useEffect(() => {

    let countersCart: countersCartType = []
    let countersWish: countersWishType = []

    const notParsedCart = localStorage.getItem('cart')
    const notParsedWishlist = localStorage.getItem('wishlist')

    if (notParsedCart) countersCart = JSON.parse(notParsedCart) || []
    if (notParsedWishlist) countersWish = JSON.parse(notParsedWishlist) || []

    if (countersCart.length !== 0) {
      setHeaderUpperRight("header__upper__right__has-counter")
      setHeaderUpperRightSaved("header__upper__right__saved__has-counter")
    }
    else {
      setHeaderUpperRight("")
      setHeaderUpperRightSaved("")
    }

    let savedCounterNumber: number = countersWish.length
    let cartCounterNumber: number = countersCart.length

    if (savedCounterNumber > 99) savedCounterNumber = 99
    if (cartCounterNumber > 99) cartCounterNumber = 99

    if (savedCounterNumber !== 0) {
      setSavedCounter(savedCounterNumber)
      setTimeout(() => setSavedCounterStyle("header__upper__right__saved__counter__not-blurred"), 100)
    }
    else setTimeout(() => setSavedCounterStyle(""), 100)

    if (cartCounterNumber !== 0) {
      setCartCounter(cartCounterNumber)
      setTimeout(() => setCartCounterStyle("header__upper__right__saved__counter__not-blurred"), 100)
    }
    else setTimeout(() => setCartCounterStyle(""), 100)
  }, [trigger])

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible)

    // if (!dropdownVisible) document.body.classList.add("stop-scroll")
    // else if (dropdownVisible) document.body.classList.remove("stop-scroll")
  }

  return (
    <header id="header" className="header">
      <div className="header__upper cont">

        <div className="header__upper__left">
          <div className="header__upper__left__hamburger" onClick={handleDropdown}>
            <button className="header__upper__left__hamburger__nav-toggle">
              <Image src="/images/icons/menu.svg" className="icon-style header__upper__left__hamburger__nav-toggle__icon" width="24" height="24" alt="menu" />
            </button>

            {dropdownVisible && <Dropdown dictionary={dictionary} isLoggedIn={isLoggedIn} />}

          </div>
          <div className="header__upper__left__logo">
            <Link href={"/"} className="header__upper__left__logo__link">
              <Image src="/images/log.webp" width="42" height="22" className="header__upper__left__logo__bricks" alt="logo" />
            </Link>
          </div>
        </div>

        <div className={`header__upper__right ${headerUpperRight}`}>

          <div className="header__upper__right__search">
            <Link href={"/search"}>
              <Image src="/images/icons/search.svg" className="icon-style--search--header" width="22" height="16" alt="search" />
            </Link>
          </div>

          <div className={`header__upper__right__saved ${headerUpperRightSaved}`}>
            <Link href={"/saved"} className="header__upper__right__saved--link">
              <Image src="/images/icons/heart.svg" className="icon-style" width="24" height="24" alt="heart" />
              <p className={`header__upper__right__saved__counter ${savedCounterStyle}`}>
                {savedCounter}
              </p>
            </Link>
          </div>

          <div className="header__upper__right__cart">
            <Link href={"/cart"}>
              <Image src="/images/icons/cart.svg" className="icon-style fa-basket-shopping" width="24" height="24" alt="cart" />
              <p className={`header__upper__right__cart__counter ${cartCounterStyle}`}>
                {cartCounter}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header