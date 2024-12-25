// Web Component for Frame
class Frame extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    WebFont.load({
      google: {
        families: ["Lato:100,300,400,600,700"],
      },
    });
  }

  connectedCallback() {
    const config = JSON.parse(this.getAttribute("config"));
    const app_theme_config = JSON.parse(this.getAttribute("app_theme_config"));

    let newAppThemeConfig = {
      color: {
        accent:
          app_theme_config?.color?.primary ||
          config?.config?.color?.primary ||
          "#DDE2E5",
        header: "#FFFFFF",
        primary:
          app_theme_config?.color?.primary ||
          config?.config?.color?.primary ||
          "#DDE2E5",
        sidebar:
          app_theme_config?.color?.secondary ||
          config?.config?.color?.secondary ||
          "#E1D6AE",
        secondary:
          app_theme_config?.color?.secondary ||
          config?.config?.color?.secondary ||
          "#E1D6AE",
        background:
          app_theme_config?.color?.background ||
          config?.config?.color?.background ||
          "#FFFFFF",
        typography: "#212429",
        headerBorder: "#DDE2E5",
      },
    };
    this.render({ ...config, config: newAppThemeConfig });
  }

  render(config) {
    const pathname = window.location.pathname;
    const template = document.createElement("template");

    let drawerType;
    let baseUrl = "/api/v1/profile/";

    function getCookie(name) {
      var cookieArray = document.cookie.split(";");
      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
          return cookie.substring(name.length + 1, cookie.length);
        }
      }
      return null;
    }

    template.innerHTML = `
          <style>
            // Boostrap Css
            .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
              --bs-gutter-x: 1.5rem;
              --bs-gutter-y: 0;
              width: 100%;
              padding-right: calc(var(--bs-gutter-x) * .5);
              padding-left: calc(var(--bs-gutter-x) * .5);
              margin-right: auto;
              margin-left: auto;
            }

            .d-flex {
                display: flex!important;
            }

            .vh-100 {
                height: 100vh!important;
            }

            .flex-column {
                flex-direction: column!important;
            }

            .flex-grow-1 {
                flex-grow: 1!important;
            }

            .p-0 {
                padding: 0!important;
            }

            .align-items-center {
                align-items: center!important;
            }

            .justify-content-between {
                justify-content: space-between!important;
            }

            *, ::after, ::before {
                box-sizing: border-box;
            }

            .overflow-y-auto {
                overflow-y: auto!important;
            }

            .nav {
                --bs-nav-link-padding-x: 1rem;
                --bs-nav-link-padding-y: 0.5rem;
                --bs-nav-link-font-weight: ;
                --bs-nav-link-color: var(--bs-link-color);
                --bs-nav-link-hover-color: var(--bs-link-hover-color);
                --bs-nav-link-disabled-color: var(--bs-secondary-color);
                display: flex;
                flex-wrap: wrap;
                padding-left: 0;
                margin-top: 0;
                margin-bottom: 0;
                list-style: none;
            }

            .position-relative {
                position: relative!important;
            }

            .dropdown, .dropdown-center, .dropend, .dropstart, .dropup, .dropup-center {
                position: relative;
            }

            .btn {
              --bs-btn-padding-x: 0.75rem;
              --bs-btn-padding-y: 0.375rem;
              --bs-btn-font-family: ;
              --bs-btn-font-size: 1rem;
              --bs-btn-font-weight: 400;
              --bs-btn-line-height: 1.5;
              --bs-btn-color: var(--bs-body-color);
              --bs-btn-bg: transparent;
              --bs-btn-border-width: var(--bs-border-width);
              --bs-btn-border-color: transparent;
              --bs-btn-border-radius: var(--bs-border-radius);
              --bs-btn-hover-border-color: transparent;
              --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),0 1px 1px rgba(0, 0, 0, 0.075);
              --bs-btn-disabled-opacity: 0.65;
              --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
              display: inline-block;
              padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
              font-family: var(--bs-btn-font-family);
              font-size: var(--bs-btn-font-size);
              font-weight: var(--bs-btn-font-weight);
              line-height: var(--bs-btn-line-height);
              color: var(--bs-btn-color);
              text-align: center;
              text-decoration: none;
              vertical-align: middle;
              cursor: pointer;
              -webkit-user-select: none;
              -moz-user-select: none;
              user-select: none;
              border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
              border-radius: var(--bs-btn-border-radius);
              background-color: var(--bs-btn-bg);
              transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          }

          .dropdown-menu {
              --bs-dropdown-zindex: 1000;
              --bs-dropdown-min-width: 10rem;
              --bs-dropdown-padding-x: 0;
              --bs-dropdown-padding-y: 0.5rem;
              --bs-dropdown-spacer: 0.125rem;
              --bs-dropdown-font-size: 1rem;
              --bs-dropdown-color: var(--bs-body-color);
              --bs-dropdown-bg: var(--bs-body-bg);
              --bs-dropdown-border-color: var(--bs-border-color-translucent);
              --bs-dropdown-border-radius: var(--bs-border-radius);
              --bs-dropdown-border-width: var(--bs-border-width);
              --bs-dropdown-inner-border-radius: calc(var(--bs-border-radius) - var(--bs-border-width));
              --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
              --bs-dropdown-divider-margin-y: 0.5rem;
              --bs-dropdown-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
              --bs-dropdown-link-color: var(--bs-body-color);
              --bs-dropdown-link-hover-color: var(--bs-body-color);
              --bs-dropdown-link-hover-bg: var(--bs-tertiary-bg);
              --bs-dropdown-link-active-color: #fff;
              --bs-dropdown-link-active-bg: #0d6efd;
              --bs-dropdown-link-disabled-color: var(--bs-tertiary-color);
              --bs-dropdown-item-padding-x: 1rem;
              --bs-dropdown-item-padding-y: 0.25rem;
              --bs-dropdown-header-color: #6c757d;
              --bs-dropdown-header-padding-x: 1rem;
              --bs-dropdown-header-padding-y: 0.5rem;
              position: absolute;
              z-index: var(--bs-dropdown-zindex);
              display: none;
              min-width: var(--bs-dropdown-min-width);
              padding: var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);
              margin: 0;
              font-size: var(--bs-dropdown-font-size);
              color: var(--bs-dropdown-color);
              text-align: left;
              list-style: none;
              background-color: var(--bs-dropdown-bg);
              background-clip: padding-box;
              border: var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);
              border-radius: var(--bs-dropdown-border-radius);
          }

          .dropdown-item {
              display: block;
              width: 100%;
              padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
              clear: both;
              font-weight: 400;
              color: var(--bs-dropdown-link-color);
              text-align: inherit;
              text-decoration: none;
              white-space: nowrap;
              background-color: transparent;
              border: 0;
              border-radius: var(--bs-dropdown-item-border-radius,0);
          }

          hr {
              margin: 1rem 0;
              color: inherit;
              border: 0;
              opacity: .25;
          }
            :host {
                --primary-color: ${
                  tinycolor(config?.config?.color?.primary).toHexString() ||
                  "#DDE2E5"
                };
                --primary-light-color: ${tinycolor
                  .mix(
                    tinycolor(config?.config?.color?.primary).toHexString(),
                    "#FFFFFF",
                    90
                  )
                  .toHexString()};
                --secondary-color: ${
                  tinycolor(config?.config?.color?.secondary).toHexString() ||
                  "#E1D6AE"
                };
                --accent-color: ${
                  tinycolor(config?.config?.color?.accent).toHexString() ||
                  "#DDE2E5"
                };
                --background-color: ${
                  tinycolor(config?.config?.color?.background).toHexString() ||
                  "#FFFFFF"
                };
                --typography-color: ${
                  tinycolor(config?.config?.color?.typography).toHexString() ||
                  "#212429"
                };
                --top-navbar-color: ${
                  tinycolor(config?.config?.color?.header).isLight()
                    ? tinycolor(
                        config?.config?.color?.typography
                      ).toHexString() || "#212429"
                    : "#FFFFFF"
                };
                --top-navbar-background-color: ${
                  tinycolor(config?.config?.color?.header).toHexString() ||
                  "#FFFFFF"
                };
                --top-navbar-border-color: ${
                  tinycolor(
                    config?.config?.color?.headerBorder
                  ).toHexString() || "#DDE2E5"
                };
                --side-navbar-color: ${
                  tinycolor(config?.config?.color?.sidebar).isLight()
                    ? tinycolor(
                        config?.config?.color?.typography
                      ).toHexString() || "#212429"
                    : "#FFFFFF"
                };
                --side-navbar-background-color: ${
                  tinycolor(config?.config?.color?.sidebar).toHexString() ||
                  "#E1D6AE"
                };
                --side-navbar-hover-background-color: ${
                  tinycolor(config?.config?.color?.sidebar).isLight()
                    ? tinycolor
                        .mix(
                          tinycolor(
                            config?.config?.color?.sidebar
                          ).toHexString(),
                          "#000000",
                          6
                        )
                        .toHexString() || "#E1D6AE"
                    : tinycolor
                        .mix(
                          tinycolor(
                            config?.config?.color?.sidebar
                          ).toHexString(),
                          "#FFFFFF",
                          6
                        )
                        .toHexString() || "#FFFFFF"
                };
                --gap: 0px;
            }

              .complete-hidden-scroll-style::-webkit-scrollbar-track {
                  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                  border-radius: 10px;
                  background-color: transparent;
              }

              .complete-hidden-scroll-style::-webkit-scrollbar {
                  width: 0px;
                  background-color: transparent;
              }

              .complete-hidden-scroll-style::-webkit-scrollbar-thumb {
                  border-radius: 10px;
                  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                  background-color: #555;
              }

              .frame-page {
                background-color: var(--background-color);
                overflow-y: auto;
                overflow-x: hidden;
              }

            .frame-navbar {
                position: relative;
                padding: 8px 40px 8px 24px; 
                border-bottom: 1px solid var(--top-navbar-border-color);
                background-color: var(--top-navbar-background-color);
                z-index: 10;
            }

            .frame-side-navbar {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                overflow-y: auto;
                z-index: 6;
                width: ${config?.display_sidebar === false ? "0px" : "88px"};
                min-width: ${
                  config?.display_sidebar === false ? "0px" : "88px"
                };
                max-width: ${
                  config?.display_sidebar === false ? "0px" : "88px"
                };
                padding-top: 12px;
                background-color: var(--side-navbar-background-color);
            }

            .mobile-frame-side-navbar-modal {
                position: fixed;
                top: 0px;
                display: flex;
                z-index: -1;
                width: 100vw;
                height: 100vh;
                opacity: 0%;
                background: linear-gradient(126deg, rgba(0, 0, 0, 0.80) 0%, rgb(0 0 0 / 73%) 70.87%);
                transition: width .4s ease-in, opacity .4s ease-in;
            }
            
            .open {
              display: flex;
              width: 100vw;
              opacity: 100%;
              z-index: 10;
            }

            .mobile-frame-side-navbar-modal.open > .mobile-frame-side-navbar {
              width: 100%;
              min-width: calc(100% - 40px);
              max-width: calc(100% - 40px);
            }

            .mobile-frame-side-navbar {
                position: relative;
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                overflow-y: auto;
                width: 0%;
                min-width: 0%;
                max-width: 0%;
                height: 100vh;
                padding-top: 98px;
                background-color: var(--side-navbar-background-color);
                transition: width .4s ease-out, min-width .4s ease-out, max-width .4s ease-out;
            }
            
            .open-mobile-frame-side-navbar {
                display: none;
                background: transparent;
                border: 0px;
                padding: 0px;
                margin: 0px;
            }

            .close-mobile-frame-side-navbar {
                position: absolute;
                top: 50px;
                right: 16px;
                background: transparent;
                border: 0px;
                padding: 0px;
                margin: 0px;
            }

            .gap {
                gap: var(--gap);
            }

            .small-device-height-fix2 {
                max-height: 100vh;
                max-height: calc(100vh - 41px);
                height: 100%;
            }

            .each-mobile-frame-link {
                padding: 10px 24px 10px 24px;
                text-decoration: none;
            }

            .each-frame-link {
                padding: 10px 0px 10px 0px;
                text-decoration: none;
            }

            .each-frame-link:hover {
                height: fit-content;
                max-height: min-content;
                background-color: var(--side-navbar-hover-background-color);
            }

            .each-frame-menu-label {
                color: var(--side-navbar-color);
                text-align: center;
                font-family: 'Lato';
                font-size: 10px;
                font-style: normal;
                font-weight: 700;
                line-height: 12px;
                letter-spacing: 0.2px;
            }

            .profile-dropdown-menu {
              min-width: 227px;
              padding: 4px;
              border-radius: 4px;
              background: var(--neutral-light-white, #FFF) !important;
              box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
          }
  
          .profile-dropdown-menu .dropdown-item {
              border-radius: 2px;
              padding: 12px 12px 12px 20px;
          }
  
          .profile-dropdown-menu .dropdown-item:hover,
          .profile-dropdown-menu .dropdown-item:active,
          .profile-dropdown-menu .dropdown-item:focus {
              background-color: #F0F3F4;
          }
  
          .profile-info {
              margin-bottom: 4px;
          }
  
  
          .profile-name, .profile-menu-name {
              color: var(--typography-color);
              font-family: Lato;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: 0.2px;
          }

          .profile-logout-name {
              color: #AA2113;
              font-family: Lato;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: 0.2px;
          }
  
          .profile-role {
              color: var(--neutral-mid-mid-500, #6C747D);
              font-family: Lato;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              letter-spacing: 0.2px;
          }
  
          .profile-dropdown-divider {
              margin: 0px;
              height: 1px;
              border-radius: 2px;
              background: var(--neutral-light-light-200, #DDE2E5);
          }
  
          .profile-roles {
              display: flex;
              flex-direction: column;
              padding: 12px 0px;
              overflow-y: auto;
              max-height: 248px;
          }
  
          .profile-roles .dropdown-item {
              padding: 4px 12px 4px 20px;
          }
  
          .profile-each-role .label {
              color: var(--typography-color);
              font-family: Lato;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: 0.2px;
          }
          
          .profile-menu-option {
            margin: 4px 0px;
            cursor: pointer;
          }

          .profile-logout {
              color: #AA2113;
              margin: 4px 0px;
          }

          .each-frame-link {
              padding: 10px 0px 10px 0px;
              text-decoration: none;
          }
  
          .each-frame-link:hover {
              height: fit-content;
              max-height: min-content;
              background-color: var(--side-navbar-hover-background-color);
          }
          
          .focused-frame-parent-menu, .selected-each-frame-menu, .selected-each-frame-submenu {
              background-color: var(--side-navbar-hover-background-color);
              position: relative;
          }

          .selected-each-frame-submenu::before {
              content: "";
              position: absolute;
              width: 4px;
              height: 4px;
              top: calc(50% - 2px);
              left: 8px;
              border-radius: 50%;
              background-color: var(--side-navbar-color);
          }
  
          .each-frame-menu-label {
              color: var(--side-navbar-color);
              text-align: center;
              font-family: 'Lato';
              font-size: 10px;
              font-style: normal;
              font-weight: 700;
              line-height: 12px;
              letter-spacing: 0.2px;
          }

          .mobile-each-frame-menu-label {
              color: var(--side-navbar-color);
              text-align: center;
              font-family: 'Lato';
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: 0.2px;
          }
  
          .frame-sidenav-dropdown-menu {
              display: flex;
              flex-direction: column;
              min-width: 227px;
              padding: 4px;
              border-radius: 4px;
              background: var(--side-navbar-background-color) !important;
              box-shadow: -4px 4px 8px 0px rgba(0, 0, 0, 0.15);
              border: 0px;
              gap: 6px;
          }
  
          .frame-sidenav-dropdown-menu .dropdown-item {
              border-radius: 2px;
              padding: 4px 4px 4px 20px;
              display: flex;
          }
  
          .frame-sidenav-dropdown-menu .dropdown-item:hover,
          .frame-sidenav-dropdown-menu .dropdown-item:active,
          .frame-sidenav-dropdown-menu .dropdown-item:focus {
              background-color: var(--side-navbar-hover-background-color);
          }

          .mobile-frame-sidenav-dropdown-menu {
              position: relative;
              display: flex;
              flex-direction: column;
              width: 100%;
              padding: 4px 0px 12px 0px;
              background: transparent;
              border: 0px;
          }

          .mobile-frame-sidenav-dropdown-menu .dropdown-item {
              padding: 8px 0px 8px 80px;
              display: flex;
              background-color: var(--side-navbar-hover-background-color);
          }

          .mobile-frame-sidenav-dropdown-menu .dropdown-item:hover,
          .mobile-frame-sidenav-dropdown-menu .dropdown-item:active,
          .mobile-frame-sidenav-dropdown-menu .dropdown-item:focus {
              background-color: var(--side-navbar-hover-background-color);
          }
  
          .each-frame-submenu-label {
              color: var(--side-navbar-color);
              font-family: Lato;
              font-size: 11px;
              font-style: normal;
              font-weight: 400;
              line-height: 16px;
              letter-spacing: 0.2px;
          }

          .each-mobile-frame-submenu-label {
            color: #766e54;
            text-align: center;
            font-family: 'Lato';
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 0.2px;
        }
  
          .frame-sidenav-menu-arrow {
              display: flex;
              position: absolute;
              bottom: 2px;
              right: 2px;
              height: 6px;
          }

          .mobile-frame-sidenav-menu-arrow {
              display: flex;
              position: absolute;
              top: calc(50% - 10px);
              right: 24px;
              height: 20px;
              transform: rotate(0deg);
              transition: transform .4s ease-out;
          }

          .rotate-arrow {
            transform: rotate(180deg);
          }
         
          .sideDrawerContainer {
            height: 100%;
            width: 0%; 
            position: fixed; 
            z-index: 12; 
            top: 0;
            right: 0;
            background-color: #fff; 
            overflow-x: hidden; 
          }

          .content-container {
            padding-top: 32px;
            padding-bottom: 32px;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
          }

          .content-container form {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
         
          .sideDrawerContainer a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 25px;
            color: #818181;
            display: block;
          }

         
          .sideDrawerContainer a:hover {
            color: #f1f1f1;
          }

         
          .closebtn {
            position: absolute;
            top: 0;
            right: 25px;
            font-size: 36px;
            cursor: pointer;
            z-index: 4;
            background-color: transparent;
            border: 0px;
          }

          .drawer-backdrop {
            display: none;
            background-color: #000000bf;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 11;
          }

          .drawer-content {
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            height: 100%;
          }

          #drawer-form {
            margin-left: 32px;
            margin-right: 32px;
          }

           .drawer-header {
            font-size: 22px;
            font-style: normal;
            font-weight: 600;
            line-height: 28px; /* 127.273% */
            letter-spacing: -0.2px;
            margin-left: 32px;
            margin-right: 32px;
            margin-bottom: 16px;
          }

          .drawer-server-error-text {
            color: white;
          }

          .form-label {
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            letter-spacing: 0.48px;
            color: #A3ABB1;
          }

          .drawer-input {
            border-radius: 6px;
            border: 1px solid var(--neutral-light-light-200, #DDE2E5);
            padding: 16px;
            width: 100%;
          }

          .form-field-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .drawer-submit {
            width: 100%;
          }

          .drawer-error {
            font-size: 12px;
            color: #D52918;
            display: none;
          }

          .server-drawer-error{
            background-color: #D52918;
            font-family: Lato;
            font-size: 11px;
            font-style: normal;
            font-weight: 700;
            line-height: 16px; /* 145.455% */
            letter-spacing: 0.4px;
            text-transform: uppercase;
            color: white;
            display: none;
            align-items: center;
            gap: 8px;
            padding: 16px 24px;
          }

          .submit-button {
            height: 42px;
            width: 100%;
            padding: 7px 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
            border-radius: 4px;
            border: none;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px; 
            letter-spacing: 0.2px;
            color: #fff;
            background: var(--primary-color, #5048ED);
          }

          .profileDrawerContainer {
            height: calc(100% - 43px);
            width: 0%; 
            position: fixed; 
            z-index: 5; 
            bottom: 0;
            right: 0;
            background-color: #fff; 
            overflow-x: hidden; 
          }

          .btn-close {
            position: absolute;
            top: 0.5em;
            right: 2em;
            box-sizing: content-box;
            width: 1em;
            height: 1em;
            padding: 0.25em 0.25em;
            color: #000;
            border: 0;
            border-radius: 0.25rem;
            cursor: pointer;
            background: transparent;
          }

          .profile-drawer-container {
            padding: 24px 40px;
            display: flex;
          }


          .profile-drawer-title {
              font-family: Lato;
              font-size: 10px;
              font-weight: 800;
              line-height: 12px;
              letter-spacing: 0.2em;
              color: #212429;
          }

          .profile-name-container {
              display: flex;
              gap: 24px;
              margin-top: 46px;
              align-items: center;
          }

          .change-password-btn {
              font-family: Lato;
              font-size: 14px;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: 0.20000000298023224px;
              text-align: left;
              padding: 11px 16px;
              background-color: transparent;
              border-radius: 4px;
              border: 1px solid var(--primary-color, #5048ED);
              color: var(--primary-color, #5048ED);
              cursor: pointer;
          }

          .profile-name-change-password-container {
              display: flex;
              flex-direction: column;
              gap: 12px;
          }

          .user-name {
              font-family: Source Sans Pro;
              font-size: 22px;
              font-weight: 600;
              line-height: 28px;
              letter-spacing: -0.20000000298023224px;
              text-align: left;
          }

          .profile-detail-container {
              gap: 8px;
              margin-top: 40px;
              display: flex;
              flex-direction: column;
          }

          .profile-detial-label-container {
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              gap: 24px;
              display: inline-flex
          }

          .profile-detail-label-text {
              color: #6C747D;
              font-size: 14px;
              font-family: Lato;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: 0.20px;
              word-wrap: break-word;

          }

          .profile-detail-individual-data-container {
              grid-template-columns: 1fr 1fr;
              display: grid;
          }

          .profile-detail-individual-label {
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              gap: 8px;
              display: inline-flex;
              width: 150px;
          }

          .profile-detail-individual-label-text {
              color: #A3ABB1;
              font-size: 14px;
              font-family: Lato;
              font-weight: 400;
              line-height: 20px;
              letter-spacing: 0.20px;
              word-wrap: break-word
          }

          .profile-detail-individual-label-data-container {
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              gap: 8px;
              display: inline-flex
          }

          .profile-detail-individual-label-data-text {
              color: #212429;
              font-size: 14px;
              font-family: Lato;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: 0.20px;
              word-wrap: break-word
          }

          .z-page-loader {
            position: absolute;
            bottom: -4px;
            left: 0;
            visibility: hidden;
            height: 4px;
            width: 100%;
            --color: no-repeat linear-gradient(var(--primary-color) 0 0);
            background: var(--color), var(--color), color-mix(in srgb, var(--primary-color) 40%, transparent);
            background-size: 60% 100%;
            animation: zLoader 3s infinite;
            z-index: 50;
          }

          @keyframes zLoader {
            0% {
              background-position: -150% 0, -150% 0
            }

            66% {
              background-position: 250% 0, -150% 0
            }

            100% {
              background-position: 250% 0, 250% 0
            }
          }

          @media screen and (max-height: 450px) {
            .sideDrawerContainer {padding-top: 15px;}
            .sideDrawerContainer a {font-size: 18px;}
          }

          @media screen and (max-width: 640px) {
            .frame-side-navbar {
              display: none;
            }

            .open-mobile-frame-side-navbar {
              display: ${config?.display_sidebar === false ? "none" : "flex"};
            }

            .profile-arrow {
              display: none;
            }
          }
        </style>
        <div class="container-fluid d-flex flex-column p-0 vh-100 flex-grow-1"  id="frame-container">
            <nav class="d-flex align-items-center justify-content-between frame-navbar" style="position: relative;">
                <button type="button" class="btn open-mobile-frame-side-navbar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.875 3C18.4964 3 19 3.48963 19 4.09375C19 4.69787 18.4964 5.1875 17.875 5.1875H2.125C1.50362 5.1875 1 4.69787 1 4.09375C1 3.48963 1.50362 3 2.125 3H17.875ZM17.875 8.90625C18.4964 8.90625 19 9.39588 19 10C19 10.6041 18.4964 11.0938 17.875 11.0938H2.125C1.50362 11.0938 1 10.6041 1 10C1 9.39588 1.50362 8.90625 2.125 8.90625H17.875ZM17.875 14.8125C18.4964 14.8125 19 15.3021 19 15.9062C19 16.5104 18.4964 17 17.875 17H2.125C1.50362 17 1 16.5104 1 15.9062C1 15.3021 1.50362 14.8125 2.125 14.8125H17.875Z" fill="black"/>
                  </svg>
                </button>
                <div class="d-flex align-items-center justify-content-between gap" style="--gap: 48px">
                <a href="/frame/router/">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50" viewBox="0 0 50 50" enable-background="new 0 0 512 512" xml:space="preserve" height="50"><path fill="#FEFEFE" opacity="1.000000" stroke="none" d="M33.203 50.098H0.102V0.108h49.98V50.098zM8.594 30.859s-0.005 -0.002 0.046 -0.035c0.012 -0.037 0.025 -0.075 0.04 -0.165 0.032 -0.039 0.064 -0.079 0.127 -0.053l0.469 0.4c-0.089 -0.414 -0.149 -0.695 -0.211 -1.022 0.024 -0.038 0.049 -0.077 0.155 -0.117 0.047 -0.17 0.095 -0.341 0.149 -0.579 0.046 -0.129 0.092 -0.258 0.171 -0.42 0.017 -0.028 0.024 -0.058 0.014 -0.126 0 0 0.02 -0.031 0.067 -0.072 0.008 -0.04 0.015 -0.081 -0.001 -0.199 0.022 -0.246 0.043 -0.492 0.093 -0.755 0.005 -0.01 0.017 -0.023 0.014 -0.028 -0.011 -0.018 -0.026 -0.032 -0.054 -0.139 0.003 -1.148 -0.001 -2.296 0.012 -3.444 0.007 -0.594 0.045 -1.188 0.079 -1.864 0.231 -0.388 0.758 -0.61 0.667 -1.191 -0.005 -0.034 0.272 -0.081 0.371 -0.173 0.101 -0.095 0.219 -0.266 0.198 -0.379 -0.052 -0.279 -0.179 -0.543 -0.279 -0.874 0.03 -0.096 0.059 -0.192 0.167 -0.288 0.099 -0.03 0.258 -0.033 0.288 -0.096 0.186 -0.395 0.02 -1.152 -0.311 -1.548 0.015 -2.436 0.035 -4.871 0.038 -7.307 0 -0.285 -0.054 -0.583 -0.152 -0.85 -0.109 -0.296 -0.355 -0.445 -0.678 -0.287 -0.193 0.094 -0.4 0.195 -0.546 0.347 -1.023 1.064 -2.031 2.142 -3.124 3.207 -0.446 -0.051 -0.548 0.358 -0.776 0.595 -0.004 0.004 0.113 0.126 0.154 0.254 -0.074 0.105 -0.148 0.21 -0.264 0.342 -0.013 0.03 -0.026 0.06 -0.042 0.137 0 0 -0.03 0.036 -0.066 0.065 -0.02 0.026 -0.029 0.055 -0.03 0.143 -0.043 0.081 -0.086 0.163 -0.213 0.229 -0.345 -0.049 -0.445 0.069 -0.278 0.39 0.05 0.096 0.071 0.206 0.114 0.347 0 0 -0.024 0.029 -0.071 0.032l-0.079 0.037c0.036 0.02 0.072 0.04 0.114 0.126 -0.031 0.107 -0.063 0.214 -0.138 0.287l-0.137 0.008c0.037 0.148 0.073 0.296 0.121 0.482 0 0 -0.022 0.034 -0.066 0.059 0.009 0.056 0.018 0.112 0.04 0.235 -0.005 0.045 -0.011 0.089 -0.066 0.195 -0.01 0.334 -0.02 0.667 -0.044 1.044 -0.011 0.031 -0.033 0.05 -0.115 0.081 -0.02 0.03 -0.041 0.06 -0.062 0.082 0 0 0.007 0.006 -0.068 0 -0.485 -0.29 -0.845 -0.085 -1.119 0.206 0.19 0.218 0.345 0.395 0.5 0.574 0 0 -0.001 -0.001 -0.078 -0.001 -0.369 -0.012 -0.411 0.23 -0.413 0.556 -0.019 0.025 -0.044 0.038 -0.127 0.051 -0.021 0.027 -0.042 0.054 -0.066 0.077 0 0 0.003 0.002 -0.045 0.027 -0.015 0.032 -0.03 0.064 -0.061 0.146 -0.052 0.045 -0.103 0.089 -0.222 0.12l-0.279 -0.16 -0.134 0.076c0.069 0.134 0.138 0.268 0.189 0.465 -0.079 0.1 -0.158 0.201 -0.282 0.333 -0.012 0.034 -0.024 0.068 -0.042 0.142 0 0 -0.028 0.029 -0.065 0.058 -0.021 0.026 -0.03 0.056 -0.05 0.155 -0.047 0.104 -0.095 0.208 -0.16 0.333 -0.011 0.015 -0.017 0.032 -0.052 0.111 -0.061 0.149 -0.123 0.297 -0.225 0.483 -0.008 0.036 -0.016 0.071 -0.018 0.169 -0.013 0.06 -0.026 0.12 -0.09 0.232 -0.038 0.315 -0.077 0.63 -0.108 1.033 0 2.874 -0.001 5.748 0.004 8.684 0.026 0.031 0.051 0.063 0.097 0.118 0 0 -0.005 0.031 -0.013 0.11 0.069 0.083 0.139 0.166 0.248 0.262 0.025 0.016 0.041 0.039 0.054 0.146 0.243 0.192 0.478 0.294 0.692 -0.083 0 0 0.031 0.006 0.091 0.04 0.297 0.167 0.624 -0.044 0.709 -0.421 0.023 -0.104 0.163 -0.183 0.265 -0.203 0.007 0.047 0.013 0.094 -0.016 0.19 0.011 0.204 0.021 0.408 0.022 0.699 -0.008 0.234 -0.016 0.467 -0.099 0.701q-0.194 0.063 -0.387 0.126l0.022 0.144c0.147 0.008 0.294 0.016 0.458 0.098 0.009 0.075 0.018 0.151 0.007 0.28 0.017 0.053 0.034 0.105 0.057 0.228 0.008 0.094 0.017 0.187 0.021 0.359 0.104 0.136 0.209 0.272 0.302 0.415 0 0 0.006 -0.012 0.007 0.066 0.24 0.192 0.472 0.289 0.665 -0.055 0 0 -0.005 -0.004 0.068 -0.002 0.182 -0.092 0.379 -0.164 0.537 -0.288 0.058 -0.045 0.022 -0.211 0.048 -0.367 0.013 -0.01 0.026 -0.019 0.079 -0.048 0.024 -0.018 0.041 -0.041 0.072 -0.117 0.028 -0.019 0.056 -0.037 0.159 -0.057 0.415 -0.046 0.375 -0.482 0.604 -0.741 0.018 -0.029 0.043 -0.044 0.13 -0.069 0.017 -0.033 0.035 -0.066 0.063 -0.139 0.016 -0.025 0.039 -0.038 0.146 -0.035 0.301 -0.056 0.466 -0.217 0.428 -0.571 0 0 0.029 -0.012 0.061 -0.027 0.021 -0.014 0.035 -0.033 0.065 -0.102 0.038 -0.033 0.076 -0.066 0.192 -0.083l0.789 -0.025c-0.106 -0.313 -0.168 -0.494 -0.208 -0.733 0.098 -0.102 0.195 -0.204 0.333 -0.331 0.025 -0.022 0.04 -0.049 0.062 -0.14 0.063 -0.075 0.126 -0.151 0.23 -0.25a0.156 0.156 0 0 0 0.049 -0.076m27.912 2.45s-0.029 0.001 -0.051 -0.035c-0.04 -0.012 -0.079 -0.024 -0.184 -0.063 -0.047 0.003 -0.094 0.006 -0.214 -0.007 -0.136 0.032 -0.272 0.064 -0.474 0.104 -0.078 0.074 -0.155 0.147 -0.264 0.229 -0.019 0.014 -0.027 0.033 -0.048 0.07 0 0 -0.005 0.027 -0.045 0.053 -0.016 0.044 -0.031 0.088 -0.065 0.142 0 0 0.001 0.021 -0.018 0.024 0 0 0.005 0.027 -0.045 0.098 -0.175 0.631 -0.145 1.248 0.371 1.695 0.412 0.356 0.903 0.175 1.396 -0.011a0.072 0.072 0 0 0 0.05 -0.061s0.004 0.002 0.066 -0.047c0 -0.274 0 -0.549 0.016 -0.903 -0.005 -0.109 -0.01 -0.218 0.003 -0.416 -0.027 -0.525 -0.055 -1.049 -0.081 -1.642 -0.079 -0.108 -0.159 -0.216 -0.238 -0.371 -0.022 -0.038 -0.045 -0.075 -0.064 -0.129 0 0 -0.016 -0.002 -0.048 -0.06 -0.606 -0.404 -0.991 -0.144 -1.279 0.172 -0.084 0.092 -0.047 0.294 -0.066 0.445l0.117 0.057c0.279 -0.315 0.593 -0.475 1.048 -0.23 0.088 0.131 0.176 0.263 0.254 0.438 0 0 0.015 0.042 0 0.125 -0.007 0.112 -0.013 0.224 -0.068 0.335 0 0 -0.048 0.009 -0.069 -0.012m-4.379 -0.065c-0.029 -0.078 -0.059 -0.157 -0.112 -0.296 -0.009 -0.042 -0.018 -0.085 0.041 -0.136l0.122 -0.11c-0.079 -0.029 -0.159 -0.058 -0.269 -0.157 -0.143 -0.584 -0.272 -1.172 -0.438 -1.75 -0.039 -0.137 -0.2 -0.239 -0.305 -0.358 -0.104 0.116 -0.268 0.217 -0.303 0.351 -0.252 0.976 -0.478 1.958 -0.713 2.938 -0.154 0.64 -0.308 1.28 -0.462 1.92l0.143 0.095c0.092 -0.102 0.229 -0.19 0.267 -0.309a7.813 7.813 0 0 0 0.251 -1.042c0.049 -0.289 0.16 -0.39 0.478 -0.395 1.071 -0.014 1.071 -0.033 1.305 1.006 0.011 0.047 0.012 0.096 -0.033 0.174 0.04 0.09 0.08 0.181 0.145 0.329 0.011 0.04 0.022 0.081 -0.042 0.13l-0.226 0.086q0.016 0.064 0.033 0.129c0.18 -0.042 0.36 -0.084 0.554 -0.134 0 0 0.014 0.008 0.098 0.019 0.185 -0.081 0.505 0.282 0.617 -0.155 0 0 0.02 0.041 0.055 0.1 0.042 0.014 0.083 0.028 0.193 0.035 0.526 0.123 0.915 -0.033 1.122 -0.495 0.062 -0.138 0.009 -0.327 0.009 -0.492 -0.17 0.031 -0.213 0.062 -0.229 0.103 -0.134 0.334 -0.391 0.492 -0.73 0.413 -0.357 -0.084 -0.518 -0.348 -0.507 -0.727 0.015 -0.519 -0.041 -1.044 0.025 -1.555 0.032 -0.25 0.228 -0.536 0.436 -0.681 0.109 -0.075 0.404 0.128 0.619 0.195 0.125 0.039 0.257 0.057 0.486 0.107 -0.42 -0.761 -1.044 -0.98 -1.458 -0.576 -0.214 0.209 -0.312 0.536 -0.536 0.818 -0.112 0.201 -0.226 0.402 -0.337 0.604 -0.066 0.12 -0.129 0.241 -0.212 0.326 0 0 0.003 -0.041 0.033 -0.104 0.13 -0.347 0.125 -0.36 -0.128 -0.341 0 0 0.004 0.003 0.012 -0.064m5.767 -1.233c-0.094 0.138 -0.189 0.275 -0.333 0.48 -0.025 0.74 -0.087 1.48 -0.066 2.218 0.024 0.854 0.662 1.264 1.48 1.01 0.246 -0.076 0.489 -0.115 0.484 -0.485 -0.023 -1.555 -0.02 -3.11 -0.024 -4.729 -0.11 0.035 -0.303 0.052 -0.315 0.108 -0.032 0.149 0.013 0.314 0.011 0.547 0.004 0.125 0.009 0.251 -0.015 0.438 -0.004 0.116 -0.008 0.231 -0.081 0.34 -0.023 0 -0.046 -0.001 -0.111 -0.059 -0.345 -0.158 -0.678 -0.213 -0.941 0.115 0 0 -0.028 -0.001 -0.089 0.017m-5.65 -13.652c-0.28 -0.068 -0.56 -0.136 -0.828 -0.268 0.031 -0.078 0.062 -0.157 0.172 -0.229l0.626 -0.582c-0.209 -0.051 -0.321 -0.078 -0.406 -0.174 0.184 -0.293 0.288 -0.636 0.792 -0.545 0.299 0.054 0.309 -0.258 0.159 -0.44 -0.235 -0.287 -0.515 -0.538 -0.786 -0.793 -0.308 -0.291 -0.574 -0.206 -0.719 0.157 -0.252 0.631 -0.527 1.263 -0.687 1.92a114.355 114.355 0 0 0 -2.67 15.648c-0.139 1.39 -0.216 2.787 -0.303 4.182 -0.039 0.627 0.285 1.08 0.802 1.454 0.127 -0.689 0.188 -1.362 0.204 -2.036 0.082 -3.504 0.451 -6.973 1.258 -10.388 0.552 -2.337 1.387 -4.568 2.606 -6.645 0.144 -0.246 0.356 -0.452 0.536 -0.677l0.18 0.066c0.039 0.246 0.112 0.493 0.111 0.739 -0.015 2.112 -0.345 4.174 -1.051 6.168 -0.089 0.252 -0.233 0.511 -0.423 0.692 -0.116 0.111 -0.366 0.091 -0.558 0.112 -0.129 0.014 -0.262 -0.004 -0.393 -0.007 0.004 0.152 -0.022 0.314 0.02 0.455 0.035 0.116 0.146 0.21 0.23 0.309 0.85 0.999 1.248 0.975 1.706 -0.234 0.906 -2.391 1.36 -4.882 1.347 -7.44 -0.005 -0.933 -0.543 -1.593 -1.42 -2.041l-0.384 -0.043c0.072 0.091 0.144 0.181 0.191 0.332 -0.076 0.103 -0.152 0.206 -0.311 0.308M16.632 11.436l-0.407 -0.517 -0.137 0.024c-0.025 0.225 -0.066 0.449 -0.072 0.674 -0.013 0.472 -0.159 0.815 -0.558 1.153 -0.851 0.721 -1.659 1.509 -2.394 2.348 -0.583 0.665 -0.999 1.469 -0.753 2.415 0.163 0.627 0.391 1.237 0.603 1.849 0.053 0.154 0.158 0.29 0.239 0.434l0.196 -0.046c-0.021 -0.266 -0.016 -0.537 -0.067 -0.796 -0.333 -1.679 0.752 -3.765 2.351 -4.481 -0.012 0.134 -0.011 0.265 -0.035 0.391 -0.602 3.091 -1.2 6.184 -1.815 9.272 -0.158 0.796 -0.248 1.64 -0.595 2.353 -0.297 0.61 -0.117 0.979 0.199 1.4 0.255 0.34 0.434 0.323 0.672 -0.029 0.372 -0.55 0.705 -1.138 1.426 -1.312 0.056 -0.014 0.11 -0.116 0.131 -0.187 0.118 -0.39 -0.273 -1.392 -0.627 -1.634l-0.572 0.367c0.092 -0.412 0.165 -0.687 0.215 -0.966 0.594 -3.325 1.182 -6.652 1.782 -9.976 0.032 -0.175 0.119 -0.429 0.249 -0.483 0.633 -0.267 1.281 -0.509 1.941 -0.697 0.384 -0.109 0.607 0.163 0.678 0.525 0.037 0.189 0.044 0.39 0.028 0.582 -0.175 2.124 -0.824 4.098 -1.901 5.933 -0.279 0.476 -0.655 0.794 -1.249 0.791 -0.104 -0.001 -0.265 0.092 -0.299 0.18 -0.036 0.093 0.016 0.259 0.087 0.348 0.696 0.869 1.49 0.824 2.087 -0.108a3.125 3.125 0 0 0 0.148 -0.252c0.987 -1.918 1.737 -3.918 1.988 -6.073 0.049 -0.422 0.019 -0.896 -0.128 -1.289 -0.242 -0.646 -0.595 -1.252 -0.927 -1.861 -0.254 -0.465 -0.598 -0.6 -1.094 -0.442 -0.399 0.127 -0.783 0.298 -1.192 0.456 -0.051 -0.091 -0.106 -0.188 -0.198 -0.346m28.269 10.579c0.108 -0.772 0.208 -1.546 0.326 -2.317 0.459 -3.009 1.078 -5.983 2.059 -8.87 0.14 -0.413 0.328 -0.814 0.529 -1.202 0.173 -0.334 0.42 -0.49 0.778 -0.182 0.09 0.078 0.253 0.071 0.383 0.102 0 -0.137 0.053 -0.307 -0.008 -0.406 -0.257 -0.413 -0.523 -0.824 -0.834 -1.197 -0.327 -0.392 -0.54 -0.379 -0.77 0.086 -0.329 0.667 -0.638 1.354 -0.859 2.062 -1.09 3.501 -1.742 7.099 -2.26 10.721 -0.264 1.85 -0.462 3.709 -0.688 5.565 -0.07 0.574 0.088 1.049 0.667 1.401 0.081 -0.251 0.169 -0.458 0.214 -0.674 0.474 -2.234 1.178 -4.392 2.13 -6.467 0.291 -0.634 0.546 -1.302 1.154 -1.834 0 0.623 0.073 1.178 -0.013 1.707 -0.359 2.228 -0.754 4.45 -1.163 6.67 -0.07 0.379 -0.019 0.67 0.254 0.928 0.244 0.23 0.441 0.262 0.566 -0.119 0.464 -1.419 0.937 -2.836 1.396 -4.257 0.042 -0.129 0.005 -0.283 0.005 -0.426l-0.105 -0.017 -0.563 0.887c-0.029 -0.235 -0.055 -0.31 -0.046 -0.381 0.176 -1.351 0.356 -2.701 0.534 -4.051 0.117 -0.891 -0.164 -1.591 -1.047 -2.052 -1.275 1.654 -1.957 3.621 -2.675 5.569l-0.137 -0.047c0.053 -0.372 0.107 -0.743 0.17 -1.201m-6.424 5.749c0.276 -1.133 0.555 -2.265 0.827 -3.399 0.047 -0.195 0.067 -0.396 0.099 -0.595l-0.158 -0.048 -0.502 0.718c0 -0.22 -0.015 -0.327 0.002 -0.429 0.242 -1.409 0.482 -2.819 0.737 -4.226 0.123 -0.682 -0.013 -1.023 -0.658 -1.441l-0.229 0.698c-0.29 -0.404 -0.559 -0.788 -0.84 -1.163 -0.175 -0.233 -0.381 -0.228 -0.574 -0.016 -0.098 0.108 -0.188 0.225 -0.262 0.35 -1.383 2.322 -2.21 4.844 -2.605 7.503 -0.087 0.586 -0.059 1.257 0.146 1.802 0.305 0.812 0.681 0.806 1.129 0.055 0.481 -0.809 0.924 -1.642 1.349 -2.481 0.385 -0.76 0.725 -1.543 1.084 -2.316 0.063 0.16 0.058 0.3 0.04 0.438 -0.148 1.193 -0.285 2.388 -0.452 3.579 -0.087 0.619 0.196 1.015 0.701 1.364 0.061 -0.123 0.108 -0.219 0.164 -0.393m-11.267 -9.584 -0.53 0.4c-0.128 -0.176 -0.221 -0.309 -0.319 -0.437 -0.377 -0.494 -0.53 -0.488 -0.827 0.043 -0.111 0.198 -0.221 0.401 -0.298 0.614 -0.793 2.184 -1.256 4.441 -1.363 6.757 -0.025 0.543 0.164 1.12 0.358 1.642 0.266 0.716 0.956 0.918 1.62 0.981 0.598 0.057 0.816 -0.502 1.066 -0.936 0.089 -0.154 0.162 -0.319 0.226 -0.485 0.855 -2.208 1.246 -4.509 1.253 -6.866 0.002 -0.522 -0.271 -1.053 -0.461 -1.563 -0.116 -0.312 -0.367 -0.399 -0.725 -0.149m14.662 9.094c0.271 -0.703 0.826 -1.313 0.805 -2.111l-0.147 -0.067 -1.213 1.783c-0.125 -0.197 -0.159 -0.328 -0.142 -0.451 0.307 -2.35 0.615 -4.7 0.948 -7.046 0.017 -0.123 0.239 -0.271 0.391 -0.309 0.311 -0.079 0.64 -0.087 0.96 -0.131 0.301 -0.042 0.402 -0.231 0.378 -0.52 -0.026 -0.315 -0.24 -0.285 -0.46 -0.279 -0.331 0.009 -0.662 0.002 -1.034 0.002 0.05 -0.285 0.075 -0.51 0.129 -0.727 0.307 -1.244 0.604 -2.491 0.944 -3.726 0.087 -0.316 0.182 -0.715 0.662 -0.741 0.032 -0.002 0.124 -0.365 0.061 -0.426 -0.263 -0.251 -0.554 -0.517 -0.885 -0.625 -0.094 -0.031 -0.376 0.444 -0.535 0.709 -0.097 0.163 -0.135 0.365 -0.178 0.555 -0.264 1.189 -0.549 2.374 -0.772 3.571 -0.13 0.697 -0.275 1.324 -1.045 1.6 -0.117 0.042 -0.209 0.309 -0.208 0.471 0 0.106 0.175 0.234 0.298 0.31 0.115 0.071 0.264 0.088 0.421 0.135 -0.03 0.238 -0.055 0.445 -0.082 0.652 -0.288 2.239 -0.556 4.481 -0.874 6.717 -0.114 0.799 0.294 1.231 0.935 1.667 0.212 -0.332 0.409 -0.641 0.643 -1.013m-19.602 -7.987 -1.311 3.825c0.174 -1.323 0.435 -2.624 0.742 -3.914 0.157 -0.66 0.077 -0.881 -0.612 -1.128 -0.019 0.028 -0.055 0.064 -0.074 0.108 -0.389 0.909 -0.781 1.816 -1.154 2.732 -0.036 0.089 0.051 0.229 0.081 0.345l0.119 -0.004 0.464 -0.928c0.062 0.143 0.05 0.262 0.032 0.379 -0.318 2.037 -0.647 4.073 -0.95 6.113 -0.101 0.682 0.077 0.936 0.83 1.3 0.639 -3.065 1.196 -6.137 2.664 -8.933 -0.004 0.616 -0.064 1.219 -0.159 1.817 -0.085 0.534 0.149 0.892 0.6 1.241 0.07 -0.208 0.155 -0.366 0.172 -0.531 0.087 -0.823 0.142 -1.65 0.235 -2.473 0.083 -0.729 -0.063 -1.314 -0.951 -1.594 -0.221 0.5 -0.458 1.039 -0.728 1.646m23.222 15.318c-0.006 0.244 -0.032 0.49 -0.008 0.731 0.013 0.129 0.113 0.25 0.174 0.375 0.052 -0.116 0.148 -0.23 0.15 -0.347 0.014 -0.732 0.008 -1.465 0.009 -2.197 0.001 -0.518 -0.133 -0.971 -0.629 -1.228 -0.472 -0.245 -0.783 0.088 -1.098 0.353 -0.071 -0.079 -0.12 -0.144 -0.18 -0.199 -0.347 -0.323 -0.735 -0.28 -1.137 -0.125 -0.378 0.146 -0.342 0.462 -0.34 0.775 0.004 0.846 -0.009 1.693 0.007 2.539 0.003 0.142 0.116 0.283 0.178 0.424 0.051 -0.133 0.144 -0.266 0.146 -0.4 0.013 -0.797 0.024 -1.595 -0.004 -2.392 -0.015 -0.42 0.159 -0.553 0.545 -0.534 0.412 0.02 0.635 0.212 0.637 0.633 0.002 0.781 -0.005 1.563 0.008 2.343 0.002 0.121 0.094 0.24 0.144 0.359 0.069 -0.119 0.193 -0.237 0.196 -0.359 0.019 -0.732 0.017 -1.465 0.006 -2.197 -0.006 -0.399 0.069 -0.723 0.544 -0.762 0.388 -0.032 0.616 0.221 0.642 0.746 0.022 0.455 0.007 0.911 0.008 1.46m2.568 -2.118c0.001 0.731 -0.004 1.462 0.006 2.193 0.004 0.256 -0.055 0.418 -0.332 0.505 -0.569 0.179 -0.972 -0.068 -0.993 -0.691 -0.025 -0.763 0 -1.527 -0.014 -2.291 -0.002 -0.118 -0.098 -0.233 -0.15 -0.35 -0.064 0.122 -0.179 0.242 -0.183 0.365 -0.017 0.698 -0.008 1.397 -0.007 2.096 0.002 1.194 0.477 1.591 1.804 1.325 -0.184 0.349 -0.258 0.665 -0.457 0.832 -0.363 0.304 -0.717 0.056 -1.097 -0.172 -0.021 0.181 -0.025 0.369 0.065 0.476 0.248 0.294 0.581 0.405 0.964 0.284 0.51 -0.161 0.719 -0.58 0.732 -1.048 0.036 -1.299 0.022 -2.599 0.014 -3.899 -0.001 -0.088 -0.125 -0.175 -0.192 -0.263 -0.053 0.084 -0.127 0.163 -0.155 0.255 -0.027 0.09 -0.007 0.193 -0.007 0.383m-7.188 2.783c-0.542 -0.156 -0.674 -0.463 -0.488 -1.232h1.559c-0.023 -0.512 -0.006 -0.968 -0.075 -1.411 -0.069 -0.448 -0.359 -0.819 -0.817 -0.844 -0.272 -0.015 -0.636 0.161 -0.822 0.372 -0.434 0.491 -0.419 2.686 -0.043 3.233 0.018 0.027 0.032 0.067 0.057 0.078 0.27 0.115 0.566 0.349 0.807 0.303 0.27 -0.052 0.506 -0.345 0.72 -0.568 0.048 -0.05 -0.056 -0.247 -0.074 -0.314 -0.314 0.162 -0.53 0.273 -0.825 0.383M10.152 28.591l0.05 0.462 0.183 -0.036 -0.279 -1.33 -0.18 0.042c0.071 0.261 0.142 0.521 0.226 0.862m-9.055 -7.3 0.121 0.547 0.195 -0.077c-0.091 -0.174 -0.181 -0.347 -0.316 -0.47m4.315 -7.507 -0.068 -0.188 -0.265 0.386 0.142 0.091a2.734 2.734 0 0 0 0.192 -0.289m-4.431 17.478 0.108 0.132 0.157 -0.384 -0.138 -0.059c-0.043 0.081 -0.086 0.161 -0.128 0.311M4.671 35.916l0.18 -0.181 -0.248 -0.071c0.002 0.074 0.004 0.147 0.068 0.252M1.079 22.635l0.063 0.27 0.144 -0.086c-0.064 -0.083 -0.129 -0.167 -0.207 -0.183m8.875 6.437 -0.15 -0.077 0.001 0.219c0.05 -0.026 0.1 -0.052 0.149 -0.142M6.902 33.735l0.034 0.224 0.129 -0.024c-0.033 -0.07 -0.067 -0.139 -0.163 -0.2m3.208 -11.146 -0.16 -0.099 -0.039 0.08c0.052 0.02 0.105 0.04 0.2 0.019m-9.062 -0.528 -0.146 0.016 0.034 0.131c0.042 -0.03 0.083 -0.059 0.112 -0.147m4.49 -9.115 0.083 -0.08c-0.011 -0.012 -0.031 -0.034 -0.032 -0.033 -0.029 0.025 -0.057 0.052 -0.052 0.113m-0.342 22.465 0.001 -0.115c-0.016 0 -0.046 -0.001 -0.046 0 -0.003 0.038 -0.003 0.077 0.045 0.116" stroke-width="0.09765625"/><path fill="#A10C4E" opacity="1.000000" stroke="none" d="M16.65 11.466c0.073 0.128 0.129 0.225 0.18 0.316 0.409 -0.158 0.793 -0.33 1.192 -0.456 0.497 -0.158 0.841 -0.022 1.094 0.442 0.333 0.609 0.686 1.215 0.927 1.861 0.147 0.393 0.177 0.867 0.128 1.289 -0.251 2.155 -1.001 4.155 -1.988 6.073a3.125 3.125 0 0 1 -0.148 0.252c-0.597 0.932 -1.391 0.977 -2.087 0.107 -0.071 -0.088 -0.123 -0.254 -0.087 -0.348 0.034 -0.088 0.195 -0.181 0.299 -0.18 0.593 0.004 0.969 -0.315 1.249 -0.791 1.078 -1.835 1.726 -3.809 1.901 -5.933 0.016 -0.192 0.009 -0.393 -0.028 -0.582 -0.071 -0.362 -0.293 -0.635 -0.677 -0.525 -0.661 0.188 -1.308 0.431 -1.941 0.697 -0.13 0.055 -0.218 0.308 -0.249 0.483 -0.6 3.324 -1.188 6.651 -1.782 9.976 -0.05 0.279 -0.122 0.554 -0.215 0.966l0.572 -0.367c0.354 0.242 0.745 1.244 0.627 1.634 -0.021 0.071 -0.075 0.173 -0.131 0.187 -0.721 0.175 -1.055 0.762 -1.426 1.312 -0.237 0.352 -0.417 0.369 -0.672 0.029 -0.315 -0.421 -0.496 -0.79 -0.199 -1.4 0.347 -0.712 0.437 -1.557 0.595 -2.353 0.615 -3.089 1.213 -6.181 1.814 -9.272 0.025 -0.126 0.024 -0.257 0.035 -0.391 -1.599 0.716 -2.684 2.802 -2.351 4.481 0.052 0.26 0.046 0.531 0.067 0.796l-0.196 0.046c-0.081 -0.144 -0.186 -0.28 -0.239 -0.434 -0.212 -0.613 -0.44 -1.223 -0.604 -1.849 -0.246 -0.946 0.171 -1.75 0.753 -2.415 0.736 -0.839 1.543 -1.627 2.394 -2.348 0.399 -0.338 0.545 -0.68 0.558 -1.153 0.006 -0.225 0.047 -0.45 0.072 -0.674l0.137 -0.024c0.136 0.172 0.271 0.344 0.425 0.547" stroke-width="0.09765625"/><path fill="#A10C4D" opacity="1.000000" stroke="none" d="M31.508 17.856c-0.031 0.078 -0.062 0.157 -0.122 0.292 -0.358 1.333 -0.687 2.609 -1.015 3.884l0.089 0.02 1.867 -3.692a23.926 23.926 0 0 1 0.264 -0.353 8.887 8.887 0 0 1 0.222 -0.234c0.812 0.436 1.351 1.096 1.355 2.029 0.013 2.559 -0.441 5.05 -1.347 7.44 -0.458 1.21 -0.856 1.233 -1.706 0.234 -0.084 -0.099 -0.196 -0.193 -0.23 -0.309 -0.042 -0.141 -0.016 -0.302 -0.02 -0.455 0.131 0.003 0.264 0.021 0.393 0.007 0.192 -0.021 0.442 -0.001 0.558 -0.112 0.189 -0.182 0.333 -0.44 0.423 -0.692 0.706 -1.994 1.036 -4.056 1.051 -6.168 0.002 -0.246 -0.072 -0.493 -0.111 -0.739l-0.18 -0.066c-0.18 0.225 -0.392 0.431 -0.536 0.677 -1.219 2.077 -2.054 4.308 -2.606 6.645 -0.807 3.415 -1.176 6.884 -1.258 10.388 -0.016 0.674 -0.077 1.346 -0.204 2.036 -0.517 -0.373 -0.841 -0.827 -0.802 -1.454 0.088 -1.395 0.165 -2.792 0.303 -4.182a114.355 114.355 0 0 1 2.67 -15.648c0.16 -0.657 0.435 -1.289 0.687 -1.92 0.145 -0.363 0.41 -0.449 0.719 -0.157 0.271 0.256 0.551 0.507 0.786 0.793 0.149 0.182 0.139 0.494 -0.159 0.44 -0.504 -0.091 -0.608 0.252 -0.826 0.604 -0.111 0.27 -0.188 0.48 -0.265 0.691" stroke-width="0.09765625"/><path fill="#A0074B" opacity="1.000000" stroke="none" d="M5.249 14.581c0.043 -0.081 0.086 -0.163 0.151 -0.285 0.03 -0.071 0.037 -0.102 0.044 -0.132 0 0 0.03 -0.036 0.054 -0.071 0.036 -0.067 0.048 -0.098 0.06 -0.13 0.074 -0.105 0.148 -0.209 0.259 -0.362 0.246 -0.296 0.456 -0.545 0.666 -0.793 1.013 -1.073 2.021 -2.151 3.044 -3.215 0.146 -0.151 0.353 -0.252 0.546 -0.347 0.323 -0.158 0.569 -0.009 0.678 0.287 0.098 0.267 0.152 0.566 0.152 0.85 -0.003 2.436 -0.023 4.871 -0.04 7.391 -0.037 0.267 -0.011 0.505 -0.118 0.623 -0.322 0.354 -0.695 0.661 -1.05 0.943 -0.153 -0.346 -0.23 -0.772 -0.475 -0.923 -0.364 -0.223 -0.625 0.189 -0.875 0.43 -0.267 0.258 -0.523 0.528 -0.791 0.747 -0.012 -1.034 -0.022 -2.021 -0.017 -3.009 0.002 -0.379 -0.12 -0.73 -0.488 -0.79 -0.227 -0.037 -0.55 0.133 -0.736 0.309 -0.527 0.496 -1.005 1.043 -1.511 1.526 -0.017 -0.338 -0.025 -0.633 -0.034 -0.928 0.005 -0.045 0.011 -0.089 0.02 -0.199 0.003 -0.108 0.001 -0.152 0 -0.196 0 0 0.022 -0.033 0.036 -0.084 0.025 -0.169 0.036 -0.288 0.047 -0.407 0.031 -0.107 0.063 -0.214 0.102 -0.378 0.007 -0.074 0.005 -0.091 0.004 -0.109 0 0 0.024 -0.029 0.042 -0.072 0.036 -0.146 0.055 -0.249 0.1 -0.371 0.036 -0.06 0.046 -0.101 0.075 -0.166 0.032 -0.064 0.045 -0.102 0.058 -0.141" stroke-width="0.09765625"/><path fill="#A10D4F" opacity="1.000000" stroke="none" d="M44.896 22.058c-0.058 0.415 -0.112 0.786 -0.165 1.158l0.137 0.047c0.718 -1.948 1.399 -3.915 2.675 -5.569 0.884 0.461 1.165 1.161 1.047 2.052 -0.178 1.35 -0.358 2.7 -0.534 4.051 -0.009 0.071 0.016 0.146 0.046 0.381l0.563 -0.887 0.105 0.017c0 0.143 0.036 0.297 -0.005 0.426 -0.459 1.421 -0.932 2.837 -1.396 4.257 -0.125 0.382 -0.322 0.35 -0.566 0.119 -0.273 -0.257 -0.324 -0.549 -0.254 -0.928 0.408 -2.22 0.804 -4.442 1.163 -6.67 0.085 -0.529 0.013 -1.084 0.013 -1.707 -0.608 0.532 -0.863 1.201 -1.154 1.834 -0.953 2.074 -1.656 4.233 -2.13 6.467 -0.046 0.216 -0.133 0.423 -0.214 0.674 -0.579 -0.353 -0.736 -0.827 -0.667 -1.401 0.225 -1.855 0.423 -3.715 0.688 -5.565 0.517 -3.622 1.17 -7.22 2.26 -10.721 0.221 -0.708 0.53 -1.395 0.859 -2.062 0.23 -0.466 0.443 -0.478 0.77 -0.086 0.311 0.372 0.577 0.784 0.834 1.196 0.062 0.099 0.008 0.269 0.008 0.406 -0.129 -0.032 -0.292 -0.025 -0.383 -0.102 -0.358 -0.308 -0.605 -0.152 -0.778 0.182 -0.201 0.388 -0.388 0.789 -0.529 1.202 -0.981 2.888 -1.6 5.861 -2.059 8.87 -0.118 0.771 -0.218 1.544 -0.331 2.36" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.695 19.385c0.353 -0.325 0.727 -0.632 1.049 -0.986 0.107 -0.118 0.081 -0.356 0.126 -0.577 0.325 0.266 0.491 1.022 0.305 1.418 -0.03 0.063 -0.189 0.066 -0.328 0.056 -0.027 -0.215 -0.013 -0.389 0 -0.564l-0.167 -0.05c-0.339 0.631 -0.677 1.263 -1.047 1.911 -0.326 0.727 -0.622 1.437 -0.936 2.179 -0.2 0.535 -0.394 1.034 -0.561 1.542 -0.983 2.99 -1.604 6.065 -2.151 9.174h0.261c-0.22 0.213 -0.18 0.648 -0.619 0.659 -0.005 -0.209 0.057 -0.389 0.025 -0.552 -0.229 -1.185 -0.478 -2.367 -0.726 -3.586a413.184 413.184 0 0 0 -1.298 -3.356c-0.001 0.005 0.008 0.001 0.007 -0.031 -0.035 -0.085 -0.068 -0.138 -0.106 -0.226a206.445 206.445 0 0 0 -1.805 -3.155c-0.046 -0.079 -0.164 -0.115 -0.249 -0.171 0.038 -0.315 0.077 -0.63 0.148 -0.937 0.783 0.674 1.532 1.341 2.371 2.087 0 -0.41 0 -0.665 0 -0.973 0 -0.087 -0.001 -0.121 -0.025 -0.18 -0.032 -0.114 -0.04 -0.204 -0.004 -0.297 0.074 -0.007 0.103 -0.01 0.143 0.021 0.045 0.175 0.079 0.314 0.109 0.496 0.015 0.151 0.035 0.261 0.047 0.385 -0.003 0.038 0.011 0.053 0.032 0.102 0.094 0.487 0.037 0.994 0.515 1.322 0.193 0.286 0.375 0.54 0.562 0.828 0.116 0.256 0.228 0.479 0.409 0.841 0.143 -0.456 0.24 -0.767 0.357 -1.107 0.484 -1.08 0.95 -2.129 1.439 -3.2 0.722 -1.038 1.42 -2.054 2.118 -3.07" stroke-width="0.09765625"/><path fill="#A10E4E" opacity="1.000000" stroke="none" d="M38.472 27.803c-0.052 0.135 -0.099 0.231 -0.159 0.354 -0.505 -0.349 -0.787 -0.745 -0.701 -1.364 0.166 -1.191 0.304 -2.385 0.452 -3.579 0.017 -0.138 0.022 -0.278 -0.04 -0.438 -0.36 0.773 -0.699 1.556 -1.084 2.316 -0.426 0.84 -0.868 1.673 -1.349 2.481 -0.448 0.752 -0.824 0.758 -1.129 -0.055 -0.205 -0.546 -0.233 -1.216 -0.146 -1.802 0.395 -2.659 1.221 -5.181 2.605 -7.503 0.074 -0.125 0.165 -0.242 0.262 -0.35 0.192 -0.212 0.398 -0.218 0.574 0.016 0.282 0.375 0.55 0.76 0.84 1.163l0.229 -0.698c0.646 0.418 0.781 0.759 0.658 1.441 -0.254 1.407 -0.495 2.816 -0.737 4.226 -0.018 0.102 -0.002 0.209 -0.002 0.429l0.502 -0.718 0.158 0.048c-0.032 0.199 -0.052 0.4 -0.099 0.595 -0.272 1.134 -0.55 2.266 -0.832 3.438m-3.383 -0.885c0.168 -0.159 0.397 -0.287 0.494 -0.481 0.681 -1.36 1.376 -2.716 1.984 -4.11 0.437 -1.002 0.745 -2.059 1.097 -3.051 -0.253 -0.029 -0.409 -0.01 -0.528 -0.067 -0.349 -0.165 -0.59 -0.068 -0.774 0.25 -0.098 0.168 -0.218 0.324 -0.306 0.496 -0.944 1.862 -1.639 3.81 -1.989 5.871 -0.058 0.342 -0.028 0.699 0.022 1.092m3.673 -2.385 -0.006 -0.082q-0.032 0.006 -0.063 0.013c0.01 0.04 0.02 0.08 0.068 0.069" stroke-width="0.09765625"/><path fill="#69AD48" opacity="1.000000" stroke="none" d="M6.25 33.463c-0.083 0.023 -0.162 0.023 -0.265 0.023 0.547 -3.109 1.167 -6.184 2.151 -9.174 0.167 -0.508 0.361 -1.007 0.592 -1.545 0.35 -0.329 0.65 -0.624 0.957 -0.878l0.069 0.432c-0.024 0.594 -0.062 1.188 -0.069 1.782 -0.013 1.148 -0.009 2.296 -0.012 3.513 0.004 0.085 0.008 0.1 0.012 0.116 -0.022 0.246 -0.043 0.492 -0.079 0.796a3.516 3.516 0 0 0 -0.033 0.182s-0.02 0.031 -0.035 0.065c-0.036 0.062 -0.041 0.092 -0.032 0.125a15.43 15.43 0 0 1 -0.166 0.448 27.734 27.734 0 0 0 -0.203 0.52c-0.025 0.038 -0.049 0.077 -0.098 0.161 -0.104 0.201 -0.183 0.356 -0.263 0.512 -0.032 0.039 -0.064 0.079 -0.123 0.162 -0.039 0.081 -0.052 0.117 -0.065 0.154 0 0 0.005 0.002 -0.019 0.011 -0.048 0.031 -0.063 0.058 -0.066 0.092 -0.063 0.075 -0.126 0.151 -0.221 0.265 -0.044 0.068 -0.058 0.097 -0.071 0.126a66.895 66.895 0 0 0 -0.333 0.35c-0.233 0.262 -0.427 0.48 -0.62 0.697 -0.038 0.033 -0.076 0.066 -0.144 0.126 -0.054 0.041 -0.067 0.063 -0.068 0.091 0 0 -0.029 0.012 -0.064 0.043a30.371 30.371 0 0 0 -0.471 0.534c-0.029 0.002 -0.052 0.016 -0.099 0.073 -0.049 0.064 -0.067 0.096 -0.086 0.128 -0.033 0.003 -0.059 0.019 -0.081 0.071" stroke-width="0.09765625"/><path fill="#A10D4E" opacity="1.000000" stroke="none" d="M27.24 18.164c0.328 -0.233 0.579 -0.146 0.695 0.166 0.19 0.51 0.463 1.042 0.461 1.563 -0.007 2.356 -0.398 4.657 -1.253 6.866 -0.064 0.166 -0.137 0.331 -0.226 0.485 -0.25 0.434 -0.468 0.993 -1.066 0.936 -0.663 -0.063 -1.354 -0.265 -1.62 -0.981 -0.194 -0.522 -0.384 -1.1 -0.358 -1.642 0.107 -2.317 0.571 -4.574 1.363 -6.757 0.077 -0.213 0.187 -0.415 0.298 -0.614 0.297 -0.531 0.45 -0.537 0.827 -0.043 0.098 0.129 0.191 0.261 0.319 0.438 0.18 -0.136 0.355 -0.268 0.56 -0.416m-2.348 5.807c-0.036 0.388 -0.108 0.777 -0.101 1.164 0.011 0.614 0.008 1.241 0.134 1.836 0.115 0.544 0.538 0.635 0.881 0.195a4.99 4.99 0 0 0 0.76 -1.396c0.701 -2.011 1.002 -4.097 1.061 -6.221 0.005 -0.167 -0.044 -0.335 -0.08 -0.58 -0.224 0.125 -0.38 0.2 -0.522 0.295 -0.283 0.191 -0.536 0.501 -0.842 0.564 -0.41 0.084 -0.468 0.352 -0.533 0.633 -0.262 1.138 -0.503 2.282 -0.757 3.509" stroke-width="0.09765625"/><path fill="#A20D4E" opacity="1.000000" stroke="none" d="M41.854 27.305c-0.216 0.341 -0.413 0.65 -0.624 0.982 -0.641 -0.436 -1.049 -0.868 -0.936 -1.667 0.318 -2.235 0.587 -4.477 0.874 -6.717 0.027 -0.207 0.052 -0.415 0.082 -0.652 -0.157 -0.047 -0.306 -0.063 -0.421 -0.135 -0.123 -0.076 -0.297 -0.204 -0.298 -0.31 -0.001 -0.162 0.091 -0.429 0.208 -0.471 0.77 -0.276 0.915 -0.903 1.045 -1.6 0.223 -1.197 0.508 -2.382 0.772 -3.571 0.042 -0.19 0.08 -0.392 0.178 -0.555 0.158 -0.265 0.441 -0.74 0.535 -0.709 0.331 0.108 0.621 0.374 0.885 0.625 0.064 0.061 -0.028 0.424 -0.061 0.426 -0.48 0.026 -0.575 0.425 -0.662 0.741 -0.341 1.235 -0.637 2.482 -0.944 3.726 -0.054 0.218 -0.079 0.443 -0.129 0.727 0.371 0 0.703 0.007 1.034 -0.002 0.22 -0.006 0.434 -0.035 0.46 0.279 0.024 0.289 -0.077 0.478 -0.378 0.52 -0.32 0.045 -0.649 0.053 -0.96 0.131 -0.152 0.038 -0.374 0.187 -0.391 0.309 -0.332 2.346 -0.64 4.696 -0.948 7.046 -0.016 0.124 0.018 0.254 0.142 0.451l1.213 -1.783 0.147 0.067c0.021 0.798 -0.534 1.408 -0.823 2.142" stroke-width="0.09765625"/><path fill="#A10E4E" opacity="1.000000" stroke="none" d="M22.287 19.253c0.254 -0.573 0.491 -1.112 0.712 -1.612 0.887 0.28 1.034 0.866 0.951 1.594 -0.094 0.822 -0.149 1.649 -0.235 2.473 -0.018 0.165 -0.103 0.324 -0.173 0.532 -0.452 -0.349 -0.685 -0.707 -0.6 -1.241 0.095 -0.598 0.155 -1.202 0.159 -1.817 -1.468 2.796 -2.025 5.868 -2.664 8.933 -0.753 -0.363 -0.931 -0.617 -0.83 -1.3 0.302 -2.04 0.631 -4.075 0.95 -6.113 0.018 -0.118 0.031 -0.236 -0.032 -0.379l-0.464 0.928 -0.119 0.004c-0.03 -0.116 -0.117 -0.256 -0.081 -0.345 0.373 -0.915 0.765 -1.823 1.154 -2.732 0.019 -0.044 0.055 -0.081 0.074 -0.108 0.69 0.248 0.77 0.468 0.612 1.128 -0.307 1.29 -0.568 2.591 -0.742 3.914 0.437 -1.275 0.874 -2.55 1.328 -3.859" stroke-width="0.09765625"/><path fill="#BAD635" opacity="1.000000" stroke="none" d="M1.478 23.111c0.081 0.012 0.199 0.048 0.245 0.127 0.606 1.037 1.202 2.08 1.802 3.19 0.038 0.12 0.075 0.172 0.111 0.223 0 0 -0.009 0.003 -0.014 0.046 -0.006 1.285 -0.006 2.529 -0.011 3.772 -0.001 0.142 -0.039 0.285 -0.04 0.427 -0.001 0.15 0.021 0.301 0.004 0.464 -0.347 0.355 -0.664 0.696 -0.981 1.038 0 0 -0.031 -0.006 -0.085 0.007 -0.251 0.006 -0.447 0 -0.644 -0.007 -0.007 -0.029 -0.023 -0.052 -0.074 -0.106l-0.213 -0.303s0.005 -0.031 -0.008 -0.074c-0.038 -0.075 -0.063 -0.106 -0.089 -0.138 0 -2.874 0.001 -5.748 -0.003 -8.666" stroke-width="0.09765625"/><path fill="#BAD638" opacity="1.000000" stroke="none" d="M3.993 23.296v0.921c-0.839 -0.746 -1.588 -1.413 -2.345 -2.114 0.005 -0.094 0.019 -0.154 0.05 -0.263 0.025 -0.085 0.033 -0.121 0.041 -0.156 0.061 -0.149 0.123 -0.297 0.217 -0.482 0.057 -0.054 0.058 -0.074 0.038 -0.095 0.047 -0.104 0.095 -0.208 0.171 -0.361 0.048 -0.074 0.058 -0.103 0.058 -0.136 0 0 0.028 -0.029 0.052 -0.066 0.037 -0.07 0.05 -0.103 0.063 -0.136 0.079 -0.1 0.158 -0.201 0.271 -0.347a32.52 32.52 0 0 1 0.256 -0.322c0.052 -0.045 0.103 -0.089 0.187 -0.171 0.047 -0.07 0.062 -0.101 0.077 -0.133 0 0 -0.003 -0.002 0.023 -0.008 0.048 -0.032 0.069 -0.059 0.091 -0.086 0.031 0 0.057 -0.012 0.109 -0.076l0.456 -0.517s0.001 0.001 0.031 -0.014c0.241 -0.263 0.453 -0.511 0.664 -0.759 0 0 -0.007 -0.006 0.02 -0.012 0.047 -0.037 0.067 -0.067 0.087 -0.097 0.031 -0.009 0.053 -0.029 0.094 -0.085 0.03 -0.025 0.077 -0.032 0.08 0.016 0.03 0.742 0.057 1.437 0.073 2.16 -0.501 0.574 -0.992 1.119 -1.381 1.551 0.147 0.316 0.252 0.502 0.321 0.701 0.062 0.18 0.084 0.373 0.124 0.56 0.008 0.09 0.017 0.179 0.024 0.313 0.016 0.1 0.033 0.157 0.05 0.213" stroke-width="0.09765625"/><path fill="#68AD47" opacity="1.000000" stroke="none" d="M4.932 30.043c0.242 1.183 0.491 2.364 0.72 3.549 0.032 0.163 -0.03 0.343 -0.063 0.553 -0.042 0.055 -0.07 0.074 -0.131 0.121 -0.064 0.046 -0.079 0.072 -0.078 0.107 -0.013 0.01 -0.026 0.019 -0.077 0.064a149.609 149.609 0 0 0 -0.621 0.617s0.005 0.004 -0.039 0.004a96.191 96.191 0 0 1 -0.623 -0.023s-0.006 0.012 -0.009 -0.022c-0.1 -0.176 -0.197 -0.317 -0.294 -0.459a4.688 4.688 0 0 1 -0.021 -0.344c-0.011 -0.115 -0.027 -0.167 -0.043 -0.22 -0.009 -0.075 -0.018 -0.151 -0.026 -0.299 -0.006 -0.147 -0.012 -0.221 -0.018 -0.294 0.008 -0.234 0.016 -0.467 0.05 -0.772 0.013 -0.273 0.001 -0.475 -0.012 -0.677a1.367 1.367 0 0 1 -0.015 -0.178c0.004 -0.036 0.027 -0.047 0.044 -0.077 0.027 -0.878 0.774 -1.163 1.256 -1.651" stroke-width="0.09765625"/><path fill="#E73491" opacity="1.000000" stroke="none" d="M45.493 34.557c-0.001 -0.503 0.014 -0.959 -0.008 -1.414 -0.025 -0.525 -0.253 -0.777 -0.642 -0.746 -0.475 0.038 -0.55 0.362 -0.544 0.762 0.011 0.732 0.012 1.465 -0.007 2.197 -0.003 0.121 -0.128 0.239 -0.196 0.359 -0.05 -0.12 -0.142 -0.239 -0.144 -0.359 -0.014 -0.781 -0.006 -1.562 -0.008 -2.343 -0.001 -0.421 -0.225 -0.613 -0.637 -0.633 -0.386 -0.019 -0.56 0.114 -0.545 0.534 0.028 0.796 0.017 1.595 0.004 2.392 -0.002 0.134 -0.095 0.267 -0.146 0.4 -0.062 -0.141 -0.175 -0.282 -0.178 -0.424 -0.016 -0.846 -0.003 -1.692 -0.007 -2.539 -0.002 -0.313 -0.038 -0.63 0.34 -0.775 0.402 -0.155 0.79 -0.198 1.137 0.125 0.059 0.055 0.109 0.12 0.18 0.199 0.315 -0.265 0.625 -0.598 1.098 -0.353 0.496 0.257 0.63 0.71 0.629 1.228 -0.001 0.732 0.005 1.465 -0.009 2.197 -0.002 0.117 -0.098 0.231 -0.15 0.347 -0.061 -0.125 -0.161 -0.245 -0.174 -0.375 -0.024 -0.241 0.003 -0.487 0.008 -0.778" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M48.06 32.44c0 -0.144 -0.02 -0.247 0.007 -0.337 0.028 -0.092 0.101 -0.17 0.155 -0.255 0.067 0.088 0.192 0.175 0.192 0.263 0.009 1.3 0.022 2.6 -0.014 3.899 -0.013 0.468 -0.222 0.887 -0.732 1.048 -0.383 0.121 -0.716 0.011 -0.964 -0.284 -0.091 -0.107 -0.086 -0.295 -0.065 -0.476 0.379 0.227 0.734 0.476 1.097 0.172 0.199 -0.167 0.273 -0.483 0.457 -0.832 -1.328 0.266 -1.802 -0.131 -1.804 -1.325 -0.001 -0.699 -0.01 -1.398 0.007 -2.096 0.003 -0.123 0.119 -0.243 0.183 -0.365 0.052 0.117 0.148 0.233 0.15 0.35 0.014 0.763 -0.011 1.528 0.014 2.291 0.02 0.623 0.424 0.87 0.993 0.691 0.278 -0.087 0.336 -0.25 0.332 -0.505 -0.01 -0.731 -0.005 -1.462 -0.006 -2.24" stroke-width="0.09765625"/><path fill="#E83592" opacity="1.000000" stroke="none" d="M32.149 35.148c-0.006 -0.048 -0.008 -0.098 -0.018 -0.145 -0.234 -1.038 -0.234 -1.02 -1.305 -1.006 -0.318 0.004 -0.429 0.105 -0.478 0.395a7.813 7.813 0 0 1 -0.251 1.042c-0.037 0.119 -0.175 0.207 -0.267 0.309l-0.143 -0.095c0.154 -0.64 0.309 -1.28 0.462 -1.92 0.235 -0.98 0.461 -1.963 0.713 -2.938 0.035 -0.134 0.199 -0.235 0.303 -0.351 0.105 0.118 0.265 0.221 0.305 0.358 0.166 0.578 0.295 1.166 0.45 1.812 0.031 0.112 0.049 0.162 0.067 0.212 0.009 0.043 0.018 0.085 0.035 0.191 0.038 0.142 0.067 0.221 0.096 0.3 0 0 -0.004 -0.003 -0.005 0.035 0.032 0.147 0.066 0.257 0.099 0.366 0 0 -0.003 0.041 0.005 0.098 0.124 0.676 0.24 1.296 0.356 1.915 0 0 -0.014 -0.008 -0.045 -0.02a9.277 9.277 0 0 0 -0.253 -0.077 1.953 1.953 0 0 1 -0.042 -0.182c-0.034 -0.14 -0.06 -0.219 -0.085 -0.298m-0.863 -3.671 -0.171 -0.316c-0.197 0.831 -0.369 1.555 -0.546 2.299h1.121c0.02 -0.053 0.046 -0.087 0.04 -0.112a132.91 132.91 0 0 0 -0.444 -1.87" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M40.912 35.27c0.256 -0.111 0.471 -0.222 0.785 -0.384 0.018 0.067 0.122 0.264 0.074 0.314 -0.214 0.223 -0.45 0.516 -0.72 0.568 -0.241 0.046 -0.537 -0.188 -0.807 -0.303 -0.025 -0.011 -0.038 -0.051 -0.057 -0.078 -0.376 -0.547 -0.391 -2.742 0.043 -3.233 0.186 -0.211 0.55 -0.387 0.822 -0.372 0.458 0.025 0.748 0.396 0.817 0.844 0.068 0.443 0.051 0.899 0.075 1.411H40.385c-0.186 0.769 -0.054 1.076 0.528 1.232m0.144 -1.658 0.676 -0.031c-0.171 -0.463 -0.257 -0.866 -0.47 -1.183 -0.075 -0.111 -0.523 -0.1 -0.698 0.014 -0.422 0.275 -0.261 0.735 -0.241 1.2z" stroke-width="0.09765625"/><path fill="#EA2A8E" opacity="1.000000" stroke="none" d="M39.433 30.569c0.006 1.555 0.003 3.111 0.026 4.666 0.005 0.371 -0.238 0.409 -0.484 0.485 -0.818 0.254 -1.456 -0.157 -1.48 -1.01 -0.021 -0.738 0.041 -1.479 0.125 -2.245 0.102 0.074 0.145 0.175 0.188 0.316 -0.033 0.503 -0.102 0.967 -0.089 1.428 0.008 0.274 0.104 0.566 0.232 0.812 0.211 0.407 0.62 0.32 0.946 0.216 0.122 -0.039 0.214 -0.346 0.223 -0.535 0.028 -0.631 0.021 -1.265 0.004 -1.897 -0.003 -0.132 -0.103 -0.262 -0.161 -0.431 -0.256 -0.38 -0.516 -0.351 -0.792 -0.04 -0.013 0.011 -0.046 0.016 -0.08 0.008 -0.068 -0.121 -0.103 -0.234 -0.137 -0.348 0 0 0.028 0.001 0.054 0.009 0.336 -0.016 0.647 -0.041 0.957 -0.065 0.023 0 0.046 0.001 0.125 -0.003 0.055 -0.135 0.054 -0.267 0.052 -0.398 -0.004 -0.125 -0.009 -0.251 0.002 -0.45 0.106 -0.222 0.196 -0.37 0.287 -0.518" stroke-width="0.09765625"/><path fill="#E83592" opacity="1.000000" stroke="none" d="M32.833 32.815c0.151 -0.274 0.249 -0.601 0.463 -0.81 0.414 -0.403 1.038 -0.185 1.458 0.576 -0.229 -0.049 -0.361 -0.067 -0.486 -0.106 -0.215 -0.067 -0.51 -0.27 -0.619 -0.195 -0.209 0.144 -0.404 0.431 -0.436 0.681 -0.066 0.511 -0.01 1.036 -0.025 1.555 -0.011 0.379 0.149 0.643 0.507 0.727 0.339 0.079 0.596 -0.079 0.73 -0.413 0.017 -0.041 0.06 -0.072 0.229 -0.103 0 0.165 0.052 0.354 -0.01 0.492 -0.206 0.463 -0.596 0.618 -1.176 0.474 -0.094 -0.038 -0.133 -0.055 -0.173 -0.071 0 0 -0.02 -0.041 -0.052 -0.08 -0.158 -0.414 -0.349 -0.782 -0.396 -1.167 -0.063 -0.513 -0.015 -1.039 -0.015 -1.56" stroke-width="0.09765625"/><path fill="#E73491" opacity="1.000000" stroke="none" d="M36.681 32.215c0.079 0.108 0.159 0.216 0.236 0.404 0.021 0.604 0.043 1.127 0.066 1.65 0.005 0.109 0.01 0.218 -0.015 0.398 -0.036 0.341 -0.043 0.611 -0.049 0.881 0 0 -0.004 -0.002 -0.021 0.004 -0.041 0.016 -0.06 0.032 -0.074 0.055 -0.452 0.186 -0.944 0.368 -1.355 0.011 -0.516 -0.447 -0.546 -1.064 -0.345 -1.736 0.026 -0.041 0.038 -0.06 0.038 -0.06s-0.001 -0.021 0.025 -0.042c0.044 -0.063 0.061 -0.105 0.078 -0.147 0 0 0.005 -0.027 0.028 -0.043 0.037 -0.029 0.048 -0.045 0.055 -0.063 0.078 -0.074 0.156 -0.148 0.303 -0.225a8.887 8.887 0 0 0 0.477 -0.086c0.047 -0.003 0.094 -0.006 0.188 0.021 0.084 0.043 0.122 0.057 0.16 0.071 0 0 0.029 -0.001 0.05 0.021 0.021 0.022 0.064 0.024 0.064 0.024l0.033 -0.033c0.006 -0.112 0.013 -0.224 0.037 -0.387 0.03 -0.08 0.021 -0.102 -0.008 -0.118 -0.088 -0.132 -0.176 -0.263 -0.297 -0.441 -0.065 -0.112 -0.097 -0.178 -0.127 -0.246 0.002 -0.002 0.005 -0.005 0.037 -0.007 0.133 -0.03 0.235 -0.058 0.336 -0.086 0 0 0.016 0.002 0.017 0.032 0.021 0.069 0.042 0.107 0.062 0.145m-0.029 2.582c0.006 -0.113 0.013 -0.227 0.05 -0.391 -0.01 -0.135 -0.021 -0.27 -0.059 -0.479 -0.309 -0.065 -0.647 -0.233 -0.916 -0.157 -0.176 0.05 -0.34 0.448 -0.356 0.7 -0.047 0.716 0.22 0.913 1.078 0.873 0.027 -0.007 0.049 -0.021 0.127 -0.069 0.021 -0.006 0.042 -0.012 0.106 -0.059 -0.002 -0.111 -0.005 -0.223 -0.028 -0.417" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.285 18.36c-0.581 1.231 -1.203 2.462 -1.825 3.693l-0.089 -0.02c0.329 -1.276 0.657 -2.552 1.009 -3.853 0.303 0.043 0.583 0.111 0.905 0.18" stroke-width="0.09765625"/><path fill="#A4174E" opacity="1.000000" stroke="none" d="M9.663 20.574q0.508 -0.947 1.016 -1.894l0.167 0.05c-0.013 0.175 -0.027 0.349 -0.039 0.563 -0.028 0.136 -0.058 0.232 -0.111 0.386 -0.34 0.702 -0.655 1.346 -0.985 1.954 -0.025 -0.378 -0.037 -0.719 -0.049 -1.06" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.796 32.82c0.037 0.516 -0.011 1.043 0.052 1.556 0.048 0.385 0.238 0.753 0.375 1.157 -0.059 0.486 -0.38 0.123 -0.607 0.198 -0.158 -0.625 -0.275 -1.244 -0.389 -1.902 0.066 -0.16 0.129 -0.281 0.195 -0.401 0.111 -0.202 0.225 -0.402 0.374 -0.608" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.725 21.671c0.316 -0.644 0.632 -1.288 0.973 -1.96 0.122 0.243 0.25 0.507 0.302 0.786 0.021 0.113 -0.097 0.284 -0.198 0.379 -0.099 0.092 -0.376 0.139 -0.371 0.173 0.091 0.581 -0.436 0.803 -0.672 1.232 -0.026 -0.09 -0.047 -0.221 -0.062 -0.411 0.014 -0.106 0.021 -0.153 0.028 -0.199" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M36.585 32.008c-0.085 0.057 -0.187 0.085 -0.328 0.08 -0.173 -0.073 -0.306 -0.112 -0.44 -0.152l-0.026 0.168 0.435 0.028c0.032 0.066 0.063 0.132 0.099 0.224 -0.392 -0.179 -0.706 -0.018 -0.985 0.297l-0.117 -0.057c0.019 -0.151 -0.018 -0.353 0.066 -0.445 0.288 -0.316 0.673 -0.577 1.296 -0.143" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.465 17.973c-0.174 0.251 -0.386 0.499 -0.627 0.761 -0.184 -0.163 -0.339 -0.34 -0.529 -0.558 0.274 -0.291 0.634 -0.496 1.156 -0.203" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M2.624 32.415c0.287 -0.359 0.604 -0.701 0.955 -1.017 0.049 0.126 0.065 0.226 0.08 0.326 0 0 -0.023 0.011 -0.035 0.012 -0.098 0.092 -0.238 0.17 -0.261 0.274 -0.085 0.378 -0.412 0.588 -0.739 0.404" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M7.3 32.405c0.154 -0.226 0.347 -0.444 0.57 -0.677 0.091 0.166 0.153 0.347 0.259 0.66 -0.296 0.009 -0.542 0.017 -0.829 0.017" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M6.443 12.804c-0.17 0.252 -0.38 0.501 -0.616 0.766 -0.087 -0.05 -0.204 -0.171 -0.2 -0.175 0.229 -0.236 0.33 -0.646 0.816 -0.591" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M10.146 28.551c-0.077 -0.301 -0.148 -0.561 -0.22 -0.822l0.18 -0.042 0.279 1.33 -0.183 0.036c-0.017 -0.154 -0.034 -0.308 -0.056 -0.502" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M8.792 30.573c0.064 -0.188 0.144 -0.344 0.249 -0.521 0.086 0.258 0.146 0.539 0.235 0.953 -0.182 -0.155 -0.325 -0.277 -0.483 -0.432" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M31.548 17.86c0.037 -0.214 0.114 -0.424 0.212 -0.66 0.132 0.003 0.244 0.03 0.453 0.081 -0.255 0.238 -0.44 0.41 -0.665 0.579" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M38.945 31.909c-0.289 0.053 -0.6 0.077 -0.95 0.091 0.251 -0.333 0.584 -0.278 0.95 -0.091" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.718 35.056c0.158 -0.195 0.352 -0.389 0.574 -0.596 0.021 0.098 0.057 0.264 -0.001 0.309 -0.158 0.123 -0.355 0.195 -0.573 0.287" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.991 34.225c-0.031 -0.479 -0.054 -1.002 -0.075 -1.572 0.029 0.478 0.056 1.003 0.075 1.572" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.207 14.573c0.029 0.046 0.016 0.085 -0.039 0.169 -0.054 0.085 -0.065 0.125 -0.077 0.165 -0.019 0.103 -0.037 0.206 -0.077 0.334 -0.056 -0.079 -0.077 -0.19 -0.127 -0.286 -0.167 -0.321 -0.066 -0.44 0.32 -0.382" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M2.831 19.734c-0.04 0.099 -0.114 0.191 -0.214 0.297 -0.094 -0.12 -0.163 -0.254 -0.232 -0.388l0.134 -0.076c0.093 0.053 0.186 0.106 0.313 0.167" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M6.554 33.194c0.106 -0.171 0.252 -0.338 0.427 -0.522 0.077 0.308 -0.087 0.469 -0.427 0.522" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.119 21.265c0.113 0.148 0.203 0.322 0.294 0.495l-0.194 0.077c-0.04 -0.182 -0.081 -0.364 -0.099 -0.572" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M39.434 30.538c-0.091 0.18 -0.182 0.328 -0.279 0.513 -0.022 -0.122 -0.068 -0.288 -0.035 -0.437 0.012 -0.056 0.205 -0.073 0.314 -0.076" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M37.924 32.002c0.065 0.104 0.099 0.217 0.146 0.363 -0.079 0.147 -0.171 0.261 -0.263 0.375 -0.043 -0.101 -0.085 -0.202 -0.162 -0.31 0.06 -0.144 0.154 -0.282 0.279 -0.428" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.78 17.768c-0.03 0.069 -0.092 0.133 -0.178 0.21 -0.095 -0.077 -0.167 -0.168 -0.239 -0.259 0.128 0.014 0.256 0.029 0.416 0.049" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.868 32.437c0.193 -0.032 0.39 -0.026 0.628 -0.022 -0.148 0.355 -0.382 0.253 -0.628 0.022" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.399 13.816a4.102 4.102 0 0 1 -0.179 0.257l-0.142 -0.091 0.265 -0.386c0.023 0.063 0.046 0.125 0.056 0.22" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M3.572 33.398c0.044 0.073 0.05 0.147 0.047 0.257 -0.156 0.028 -0.303 0.021 -0.45 0.013l-0.022 -0.144c0.129 -0.042 0.258 -0.084 0.425 -0.126" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.021 35.075c0.193 -0.031 0.386 -0.024 0.621 -0.019 -0.148 0.348 -0.38 0.25 -0.621 0.019" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M3.769 18.749c-0.103 0.16 -0.243 0.319 -0.411 0.496 -0.038 -0.266 0.004 -0.509 0.411 -0.496" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M0.98 31.227c0.042 -0.115 0.085 -0.196 0.129 -0.276l0.138 0.059 -0.157 0.384c-0.036 -0.044 -0.072 -0.088 -0.109 -0.167" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.238 35.633c0.112 0.017 0.186 0.039 0.285 0.076 -0.155 0.058 -0.336 0.1 -0.516 0.142l-0.033 -0.129c0.075 -0.029 0.15 -0.057 0.264 -0.09" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.78 17.75s-0.047 0.007 -0.07 0.011c-0.013 -0.329 -0.003 -0.663 0.032 -1.027 0.033 0.264 0.041 0.559 0.047 0.915 -0.002 0.061 -0.009 0.101 -0.009 0.101" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.64 35.901c-0.033 -0.089 -0.035 -0.163 -0.037 -0.237l0.248 0.071c-0.06 0.06 -0.12 0.121 -0.21 0.166" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.086 22.601c0.071 0.05 0.136 0.133 0.2 0.217l-0.144 0.086c-0.021 -0.09 -0.042 -0.18 -0.056 -0.303" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M3.714 34.594c0.099 0.102 0.196 0.244 0.302 0.416 -0.096 -0.105 -0.2 -0.241 -0.302 -0.416" stroke-width="0.09765625"/><path fill="#A1CD49" opacity="1.000000" stroke="none" d="M3.63 31.973c0.03 0.177 0.043 0.379 0.035 0.609 -0.031 -0.176 -0.042 -0.38 -0.035 -0.609" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.847 15.801c0.011 0.136 0 0.255 -0.031 0.404 -0.056 -0.117 -0.092 -0.265 -0.129 -0.413 0.046 -0.003 0.092 -0.005 0.16 0.009" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.95 35.525c-0.025 -0.246 -0.018 -0.516 0.01 -0.817 0.022 0.243 0.022 0.518 -0.01 0.816" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.954 29.104c-0.05 0.058 -0.1 0.084 -0.15 0.11l-0.001 -0.219c0.05 0.026 0.1 0.051 0.151 0.109" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M6.934 33.731c0.065 0.065 0.098 0.135 0.131 0.204l-0.129 0.024c-0.011 -0.075 -0.023 -0.149 -0.003 -0.229" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.179 29.867c0.018 -0.152 0.076 -0.306 0.159 -0.485a1.631 1.631 0 0 1 -0.159 0.485" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.228 33.681c-0.049 -0.078 -0.082 -0.188 -0.114 -0.333 0.254 -0.059 0.259 -0.045 0.114 0.333" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M39.129 31.568c0.016 0.1 0.017 0.231 -0.004 0.37 -0.019 -0.108 -0.014 -0.224 0.004 -0.37" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M10.088 22.61c-0.074 0.001 -0.126 -0.02 -0.179 -0.039l0.04 -0.08c0.054 0.033 0.107 0.066 0.139 0.12" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.022 32.816c-0.052 -0.046 -0.071 -0.096 -0.086 -0.173 0.083 0.002 0.162 0.031 0.242 0.059 -0.041 0.037 -0.081 0.073 -0.156 0.114" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.054 22.09c-0.035 0.059 -0.077 0.088 -0.119 0.118l-0.034 -0.131c0.049 -0.005 0.097 -0.011 0.152 0.013" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.123 35.163c0.051 0.064 0.077 0.143 0.099 0.254 -0.044 -0.059 -0.084 -0.149 -0.099 -0.254" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.573 32.029c0.066 0.049 0.128 0.137 0.197 0.257 -0.063 -0.051 -0.132 -0.134 -0.197 -0.257" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.093 33.211c-0.1 0.035 -0.236 0.062 -0.408 0.089 0.1 -0.033 0.235 -0.065 0.408 -0.089" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.521 12.929c0.011 -0.044 0.039 -0.071 0.068 -0.095 0.001 -0.001 0.021 0.021 0.032 0.033 -0.028 0.027 -0.056 0.053 -0.1 0.063" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.171 35.411c-0.024 -0.039 -0.023 -0.077 -0.021 -0.115 0 -0.001 0.03 0 0.046 0 0 0.038 -0.001 0.077 -0.025 0.115" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M32.123 33.278c-0.033 -0.046 -0.062 -0.125 -0.088 -0.236 0.033 0.046 0.062 0.125 0.088 0.236" stroke-width="0.09765625"/><path fill="#A1CD49" opacity="1.000000" stroke="none" d="M3.644 34.019c0.025 0.025 0.041 0.077 0.049 0.157 -0.025 -0.025 -0.042 -0.078 -0.049 -0.157" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.681 32.192c-0.021 -0.015 -0.041 -0.053 -0.064 -0.114 0.02 0.015 0.042 0.053 0.064 0.114" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.952 15.333c0.025 0.016 0.027 0.033 0.017 0.074 -0.048 0.004 -0.083 -0.016 -0.119 -0.036 0.026 -0.012 0.053 -0.024 0.103 -0.038" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.765 16.321c0.023 0.031 0.025 0.074 0.016 0.149 -0.02 -0.025 -0.029 -0.081 -0.016 -0.149" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M35.246 33.648c0.003 0.03 -0.014 0.072 -0.049 0.129 -0.002 -0.029 0.014 -0.073 0.049 -0.129" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.466 33.292c-0.027 0.004 -0.065 -0.01 -0.116 -0.039 0.026 -0.003 0.066 0.009 0.116 0.039" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.718 21.703q0.02 0.026 -0.023 0.107 -0.02 -0.026 0.023 -0.107" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M35.152 33.825c0.01 -0.001 -0.002 0.018 -0.004 0.023s-0.006 -0.021 0.004 -0.023" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.984 21.117c0.029 0.012 0.028 0.032 -0.013 0.055 -0.014 -0.013 -0.007 -0.03 0.013 -0.055" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M2.203 20.626q0.028 0.026 -0.029 0.088c-0.02 -0.018 -0.011 -0.047 0.029 -0.088" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M2.314 20.425c0.009 0.017 -0.004 0.05 -0.038 0.1 -0.008 -0.016 0.003 -0.05 0.038 -0.1" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M3.104 19.449q0.013 0.029 -0.045 0.096c-0.009 -0.019 0.006 -0.051 0.045 -0.096" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M3.217 19.349q0.006 0.03 -0.064 0.081 -0.006 -0.03 0.064 -0.081" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M4.583 17.878q0.008 0.029 -0.061 0.091 -0.008 -0.029 0.061 -0.091" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.844 35.608c-0.007 -0.023 0.012 -0.039 0.054 -0.053 0.011 0.024 -0.007 0.043 -0.054 0.053" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.426 14.179c0.011 0.016 0.003 0.046 -0.025 0.09 -0.023 -0.02 -0.013 -0.049 0.025 -0.09" stroke-width="0.09765625"/><path fill="#F5EEF4" opacity="1.000000" stroke="none" d="M33.313 35.652c0.022 -0.013 0.062 0.004 0.122 0.046 -0.021 0.011 -0.063 -0.003 -0.122 -0.046" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.536 13.977c0.009 0.017 -0.003 0.049 -0.038 0.092 -0.009 -0.018 0.004 -0.048 0.038 -0.092" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M5.4 34.364c-0.021 -0.026 -0.006 -0.052 0.048 -0.074 0.013 0.023 -0.003 0.047 -0.048 0.074" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M35.334 33.534c0.008 0.014 -0.003 0.029 -0.028 0.052 -0.015 -0.014 -0.007 -0.033 0.028 -0.052" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.599 33.322c0.024 0.001 -0.008 0.033 -0.008 0.033s-0.044 -0.001 -0.054 -0.013c-0.01 -0.012 0.038 -0.021 0.062 -0.02" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M6.357 33.382c-0.008 -0.021 0.01 -0.053 0.054 -0.098 0.008 0.02 -0.009 0.054 -0.054 0.098" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.699 27.724c-0.018 -0.007 -0.022 -0.023 -0.019 -0.062 0.021 -0.008 0.036 0.007 0.047 0.025 0.003 0.005 -0.009 0.019 -0.028 0.037" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.598 28.69c-0.017 -0.021 -0.011 -0.062 0.021 -0.123 0.018 0.021 0.01 0.062 -0.021 0.123" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.648 32.839c0.034 -0.006 0.043 0.017 0.021 0.055 -0.01 0.009 -0.025 -0.033 -0.021 -0.055" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M9.523 28.884c-0.026 -0.017 -0.021 -0.047 0.018 -0.091 0.022 0.017 0.016 0.047 -0.018 0.091" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M8.615 30.84q-0.018 -0.031 0.038 -0.112 0.018 0.03 -0.038 0.112" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M8.525 30.947c-0.017 -0.022 -0.003 -0.049 0.044 -0.082 0.017 0.022 0.002 0.049 -0.044 0.082" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M8.233 31.337c-0.007 -0.017 0.007 -0.045 0.043 -0.084 0.017 0.023 0.002 0.05 -0.043 0.084" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M7.066 32.607c-0.015 -0.021 -0.003 -0.042 0.04 -0.06 0.011 0.02 -0.004 0.039 -0.04 0.06" stroke-width="0.09765625"/><path fill="#FAFBF7" opacity="1.000000" stroke="none" d="M1.483 31.808q0.035 0 0.077 0.094 -0.035 0 -0.077 -0.094" stroke-width="0.09765625"/><path fill="#66BB48" opacity="1.000000" stroke="none" d="M4.783 17.798c-0.003 -0.048 0.004 -0.088 0.015 -0.105 0.508 -0.544 0.987 -1.091 1.513 -1.587 0.187 -0.176 0.51 -0.346 0.736 -0.309 0.368 0.06 0.49 0.411 0.488 0.79 -0.005 0.988 0.006 1.976 0.006 3.039 -0.011 0.119 -0.018 0.162 -0.071 0.204 -0.725 -0.026 -1.404 -0.064 -2.083 -0.068 -0.173 -0.001 -0.347 0.108 -0.521 0.167 -0.027 -0.695 -0.054 -1.389 -0.083 -2.131" stroke-width="0.09765625"/><path fill="#F6A736" opacity="1.000000" stroke="none" d="M7.517 19.83c0.007 -0.043 0.014 -0.086 0.032 -0.159 0.272 -0.295 0.528 -0.565 0.795 -0.823 0.249 -0.241 0.511 -0.653 0.875 -0.43 0.246 0.15 0.322 0.577 0.475 0.923 -0.697 1.059 -1.395 2.075 -2.127 3.067 -0.043 -0.819 -0.052 -1.613 -0.061 -2.436 0.004 -0.067 0.007 -0.104 0.01 -0.143" stroke-width="0.09765625"/><path fill="#FEFEFE" opacity="1.000000" stroke="none" d="M5.117 14.888c-0.015 -0.021 -0.003 -0.061 0.032 -0.121 0.014 0.021 0.004 0.061 -0.032 0.121" stroke-width="0.09765625"/><path fill="#FAFCF7" opacity="1.000000" stroke="none" d="M7.471 19.83c0.042 0.038 0.039 0.076 0.008 0.161 -0.133 0.171 -0.225 0.309 -0.344 0.417 -0.383 0.343 -0.42 0.721 -0.28 1.213 0.205 0.72 0.13 1.45 -0.208 2.136 -0.412 0.835 -1.054 0.956 -1.75 0.298 -0.136 -0.358 -0.273 -0.682 -0.406 -1.051 0.004 -0.393 0.004 -0.742 0.004 -1.115h-0.505c0.038 0.306 0.072 0.586 0.106 0.866 -0.029 0.003 -0.058 0.006 -0.132 0.013 -0.084 -0.183 -0.106 -0.377 -0.168 -0.556 -0.069 -0.199 -0.174 -0.385 -0.321 -0.701 0.39 -0.433 0.88 -0.978 1.381 -1.551 0.184 -0.088 0.358 -0.197 0.532 -0.196 0.679 0.004 1.358 0.042 2.083 0.068" stroke-width="0.09765625"/><path fill="#6BBC4D" opacity="1.000000" stroke="none" d="M4.896 24.089c0.697 0.624 1.339 0.502 1.751 -0.333 0.339 -0.685 0.413 -1.416 0.208 -2.136 -0.14 -0.492 -0.103 -0.871 0.28 -1.213 0.12 -0.107 0.212 -0.246 0.343 -0.388 0.037 0.777 0.046 1.571 0.065 2.411a70.313 70.313 0 0 1 -1.436 3.228c-0.28 0.099 -0.51 0.164 -0.74 0.228 -0.182 -0.254 -0.364 -0.508 -0.553 -0.827 0.022 -0.367 0.052 -0.669 0.081 -0.97" stroke-width="0.09765625"/><path fill="#A1CD49" opacity="1.000000" stroke="none" d="M3.676 31.694c-0.032 -0.07 -0.048 -0.17 -0.067 -0.309 -0.016 -0.189 -0.039 -0.34 -0.038 -0.49 0.001 -0.143 0.04 -0.285 0.04 -0.427 0.005 -1.243 0.005 -2.486 0.012 -3.776 0.436 1.061 0.866 2.169 1.302 3.314 -0.475 0.525 -1.223 0.81 -1.249 1.688" stroke-width="0.09765625"/><path fill="#F6A736" opacity="1.000000" stroke="none" d="M9.712 21.634c0.006 0.083 -0.001 0.129 -0.021 0.195 -0.313 0.314 -0.613 0.609 -0.945 0.906 0.264 -0.707 0.56 -1.418 0.886 -2.145 0.042 0.325 0.054 0.666 0.079 1.044" stroke-width="0.09765625"/><path fill="#A1CD49" opacity="1.000000" stroke="none" d="M4.896 24.054c-0.031 0.336 -0.06 0.638 -0.093 0.973 -0.471 -0.262 -0.414 -0.77 -0.511 -1.269 -0.007 -0.071 -0.014 -0.087 -0.022 -0.103 -0.02 -0.11 -0.04 -0.219 -0.026 -0.375 0.103 -0.108 0.173 -0.17 0.243 -0.232 0.137 0.323 0.274 0.647 0.409 1.005" stroke-width="0.09765625"/><path fill="#BAD638" opacity="1.000000" stroke="none" d="M4.491 23.003c-0.074 0.107 -0.144 0.169 -0.242 0.235 -0.063 -0.135 -0.097 -0.275 -0.142 -0.45 -0.045 -0.314 -0.08 -0.594 -0.117 -0.9h0.505c0 0.373 0 0.721 -0.004 1.115" stroke-width="0.09765625"/><path fill="#A1CD49" opacity="1.000000" stroke="none" d="M5.372 25.921c0.225 -0.099 0.455 -0.163 0.715 -0.232 -0.066 0.306 -0.164 0.617 -0.307 1.073 -0.181 -0.362 -0.292 -0.585 -0.409 -0.841" stroke-width="0.09765625"/><path fill="#A1CD49" opacity="1.000000" stroke="none" d="M3.634 26.619c-0.035 -0.02 -0.071 -0.071 -0.104 -0.157 0.037 0.019 0.07 0.072 0.104 0.157" stroke-width="0.09765625"/><path fill="#FAFCF7" opacity="1.000000" stroke="none" d="M3.994 23.244c-0.017 -0.004 -0.034 -0.061 -0.026 -0.136 0.026 0.015 0.026 0.05 0.026 0.136" stroke-width="0.09765625"/><path fill="#BAD638" opacity="1.000000" stroke="none" d="M4.263 23.669c0.016 0.002 0.022 0.018 0.03 0.048 -0.02 0.005 -0.033 -0.011 -0.03 -0.048" stroke-width="0.09765625"/><path fill="#F9F6F9" opacity="1.000000" stroke="none" d="M35.059 26.896c-0.02 -0.372 -0.05 -0.729 0.008 -1.07 0.35 -2.062 1.045 -4.01 1.989 -5.871 0.088 -0.173 0.208 -0.329 0.306 -0.496 0.185 -0.317 0.425 -0.415 0.774 -0.25 0.12 0.057 0.275 0.038 0.528 0.067 -0.351 0.992 -0.66 2.05 -1.097 3.051 -0.608 1.394 -1.303 2.75 -1.984 4.11 -0.097 0.194 -0.326 0.322 -0.524 0.459" stroke-width="0.09765625"/><path fill="#FEFEFE" opacity="1.000000" stroke="none" d="M38.743 24.558c-0.029 -0.015 -0.039 -0.055 -0.049 -0.095l0.063 -0.013c0.002 0.027 0.004 0.055 -0.014 0.107" stroke-width="0.09765625"/><path fill="#FBF9FB" opacity="1.000000" stroke="none" d="M24.894 23.927c0.251 -1.185 0.492 -2.328 0.755 -3.466 0.065 -0.282 0.123 -0.549 0.533 -0.633 0.306 -0.063 0.559 -0.373 0.842 -0.564 0.142 -0.095 0.298 -0.17 0.522 -0.295 0.035 0.245 0.084 0.413 0.08 0.58 -0.059 2.124 -0.36 4.21 -1.061 6.221a4.99 4.99 0 0 1 -0.76 1.396c-0.342 0.44 -0.765 0.349 -0.88 -0.195 -0.126 -0.595 -0.123 -1.222 -0.134 -1.836 -0.007 -0.387 0.065 -0.776 0.103 -1.207" stroke-width="0.09765625"/><path fill="#FBF1F7" opacity="1.000000" stroke="none" d="M31.298 31.515c0.153 0.635 0.294 1.233 0.432 1.832 0.006 0.026 -0.02 0.059 -0.04 0.112h-1.121l0.546 -2.299c0.092 0.169 0.131 0.243 0.183 0.354" stroke-width="0.09765625"/><path fill="#FBF1F7" opacity="1.000000" stroke="none" d="M41.009 33.611h-0.686c-0.02 -0.464 -0.182 -0.925 0.241 -1.2 0.175 -0.114 0.624 -0.125 0.698 -0.014 0.214 0.317 0.3 0.72 0.47 1.183 -0.335 0.015 -0.505 0.023 -0.723 0.031" stroke-width="0.09765625"/><path fill="#FBF1F7" opacity="1.000000" stroke="none" d="M37.808 32.78c0.091 -0.154 0.183 -0.269 0.296 -0.407 0.021 -0.024 0.054 -0.029 0.108 -0.044 0.287 0.017 0.52 0.05 0.753 0.082 0.055 0.131 0.155 0.26 0.158 0.392 0.016 0.632 0.024 1.266 -0.004 1.897 -0.008 0.189 -0.101 0.496 -0.223 0.535 -0.326 0.104 -0.734 0.191 -0.946 -0.216 -0.128 -0.246 -0.225 -0.538 -0.232 -0.812 -0.013 -0.462 0.055 -0.925 0.089 -1.428" stroke-width="0.09765625"/><path fill="#E73B96" opacity="1.000000" stroke="none" d="M38.963 32.373c-0.231 0.006 -0.464 -0.026 -0.738 -0.055 0.223 -0.296 0.482 -0.326 0.738 0.055" stroke-width="0.09765625"/><path fill="#F9F6F9" opacity="1.000000" stroke="none" d="M36.408 35.345c-0.819 0.037 -1.085 -0.161 -1.038 -0.876 0.017 -0.252 0.18 -0.65 0.356 -0.7 0.269 -0.076 0.607 0.092 0.92 0.231 0.011 0.202 0.018 0.329 0.025 0.456 -0.006 0.113 -0.013 0.227 -0.02 0.418 -0.005 0.179 -0.009 0.28 -0.014 0.381 -0.021 0.006 -0.042 0.012 -0.115 0.027 -0.082 0.016 -0.103 0.033 -0.115 0.062" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.686 34.431c-0.022 -0.102 -0.029 -0.229 -0.026 -0.394 0.021 0.098 0.031 0.233 0.026 0.394" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.659 35.235c-0.017 -0.08 -0.012 -0.181 0.003 -0.318 0.013 0.075 0.015 0.187 -0.003 0.318" stroke-width="0.09765625"/><path fill="#E83894" opacity="1.000000" stroke="none" d="M36.427 35.343c-0.008 -0.027 0.014 -0.045 0.065 -0.047 0.004 0.025 -0.019 0.039 -0.065 0.047" stroke-width="0.09765625"/><path fill="#E73491" opacity="1.000000" stroke="none" d="M36.229 32.131c-0.147 -0.008 -0.292 -0.017 -0.437 -0.026l0.026 -0.168c0.133 0.04 0.267 0.08 0.408 0.154 0.008 0.035 0.005 0.038 0.003 0.04" stroke-width="0.09765625"/></svg>
                </a>
                    
                </div>
                <div class="d-flex align-items-center gap" style="--gap: 40px">
                <div class="dropdown profile-dropdown-menu-button">
                <div class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true"
                    style="--bs-btn-padding-x:0px;--bs-btn-padding-y:0px;border:0px">
                    <div class="d-flex align-items-center gap" style="--gap: 8px">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_5506_359)">
                                <path
                                    d="M12.0001 0.599976C5.71234 0.599976 0.600098 5.71222 0.600098 12C0.600098 18.2877 5.71234 23.4 12.0001 23.4C18.2879 23.4 23.4001 18.2877 23.4001 12C23.4001 5.71222 18.2879 0.599976 12.0001 0.599976ZM12.0001 7.12774C13.9679 7.12774 15.5756 8.73554 15.5756 10.7033C15.5756 12.6711 13.9678 14.2788 12.0001 14.2788C10.0324 14.2788 8.42458 12.671 8.42458 10.7033C8.42458 8.73545 10.0324 7.12774 12.0001 7.12774ZM5.7601 18.9122V18.3844C5.7601 16.8722 6.98448 15.6244 8.5201 15.6244H15.4801C16.9923 15.6244 18.2401 16.8488 18.2401 18.3844V18.9122C16.5845 20.4 14.4001 21.3122 12.0001 21.3122C9.6001 21.3122 7.41562 20.4 5.7601 18.9122Z"
                                    fill="var(--top-navbar-color)" />
                            </g>
                            <defs>
                                <clipPath id="clip0_5506_359">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div class="profile-arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M1.87107 2.85549C1.65751 2.64192 1.31124 2.64192 1.09768 2.85549C0.884108 3.06906 0.884108 3.41532 1.09768 3.62889L4.6133 7.14451C4.64 7.17121 4.66877 7.19457 4.69909 7.21459C4.91136 7.35474 5.19983 7.33138 5.3867 7.14451L8.90232 3.62889C9.11589 3.41532 9.11589 3.06906 8.90232 2.85549C8.68876 2.64192 8.34249 2.64192 8.12893 2.85549L5 5.98441L1.87107 2.85549Z"
                          fill="var(--top-navbar-color)" />
                          </svg>
                        </div>
                    </div>
                </div>
          
                <ul class="dropdown-menu profile-dropdown-menu">
                    <li id="profile-info"><a class="dropdown-item profile-info" href="#" >
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-column gap" style="--gap: 2px">
                                    <span class="profile-name">${
                                      config?.profile?.name
                                    }</span>
                                    ${
                                      config?.profile?.current_role
                                        ? `<span class="profile-role">${config?.profile?.current_role}</span>`
                                        : ""
                                    }
                                   
                                </div>
                                <div style="display: none; !important">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <path
                                            d="M8.15859 15.4741L13.0204 10.6123C13.0204 10.6123 13.7985 9.99906 12.9407 9.24984L8.3555 4.73424C8.16175 4.54361 7.88754 4.44284 7.62034 4.4944C7.44144 4.52877 7.26252 4.62877 7.1633 4.8694C6.91642 5.47018 7.31096 5.83112 7.31096 5.83112L11.4712 9.97712L7.31096 14.1521C7.31096 14.1521 6.84846 14.6467 7.1633 15.1271C7.47736 15.6076 8.09846 15.5349 8.15862 15.474"
                                            fill="#A3ABB1" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </li>
                    ${
                      config?.profile?.roles?.length
                        ? `<li>
                              <hr class="profile-dropdown-divider">
                          </li>
                          <li>
                              <div class="profile-roles complete-hidden-scroll-style">
                              ${config?.profile?.roles
                                ?.map(({ url, label }) => {
                                  return `<div class="dropdown-item profile-each-role">
                                  <span class="label">${label}</span>
                              </div>`;
                                })
                                .join("")}
                              </div>
                          </li>`
                        : ""
                    }
                    
                    <li>
                        <hr class="profile-dropdown-divider">
                    </li>
                    <li ${
                      config?.display_edit_profile === false
                        ? "style=display:none"
                        : ""
                    }>
                          <button type="button" class="dropdown-item profile-menu-option" id="open-edit-drawer">
                              <span class="profile-menu-name">Edit</span>
                          </button>
                    </li>
                   
                  
                     
                    <li>
                        <hr class="profile-dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item profile-logout" href="/logout${config.login_url ? "?redirect_url=" + config.login_url : ""}">
                            <span class="profile-name">Log Out</span>
                        </a>
                    </li>
                </ul>
            </div>
                </div>
                 <div class="z-page-loader"></div>
            </nav>
           
            <main class="small-device-height-fix2 d-flex flex-grow-1 overflow-y-auto">
              <div class="mobile-frame-side-navbar-modal">
                <div class="nav mobile-frame-side-navbar complete-hidden-scroll-style">
                  <button type="button" class="btn close-mobile-frame-side-navbar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M17.1474 6.14745L12.3445 10.9505C12.1479 11.1471 11.836 11.1471 11.656 10.9505L6.85242 6.14745C6.65583 5.95085 6.34395 5.95085 6.16401 6.14745C5.96741 6.34405 5.96741 6.65593 6.16401 6.83588L10.9676 11.6396C11.1642 11.8362 11.1642 12.148 10.9676 12.328L6.14745 17.1476C5.95085 17.3442 5.95085 17.656 6.14745 17.836C6.34404 18.0326 6.65592 18.0326 6.83587 17.836L11.6395 13.0323C11.8361 12.8357 12.148 12.8357 12.3279 13.0323L17.1474 17.8526C17.344 18.0492 17.6559 18.0492 17.8358 17.8526C18.0324 17.656 18.0324 17.3441 17.8358 17.1641L13.0489 12.3439C12.8523 12.1473 12.8523 11.8354 13.0489 11.6555L17.8526 6.85178C18.0491 6.65518 18.0491 6.3433 17.8526 6.16335C17.656 5.96675 17.3447 5.96675 17.1475 6.14734L17.1474 6.14745Z" fill="black" stroke="black"/>
                    </svg>
                  </button>
                  ${config.menu
                    ?.map(({ url, icon, name, children }) => {
                      let isIconSvg = icon?.indexOf("<svg") !== -1;
                      let excatUrl =
                        url[url.length - 1] === "/" ? url : url + "/";
                      let isPathnameMatched =
                        pathname === excatUrl ||
                        (children?.length
                          ? children?.some(
                              (submenu) =>
                                (submenu?.url[submenu?.url.length - 1] === "/"
                                  ? submenu?.url
                                  : submenu?.url + "/") === pathname
                            )
                          : false);
                      if (children?.length) {
                        return ` <li>
                            <div class="dropdown mobile-frame-submenu-dropdown dropend position-relative ${
                              isPathnameMatched
                                ? "selected-each-frame-menu"
                                : ""
                            }">
                                <div class="btn w-100 position-relative d-flex align-items-center gap each-mobile-frame-link"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="24,0"
                                    style="--bs-btn-padding-x:0px;--bs-btn-padding-y:0px;border:0px;--gap: 16px">
                                    ${
                                      icon
                                        ? isIconSvg
                                          ? icon
                                          : `<img src=${icon} alt=${name} width="40px" height="40px"/>`
                                        : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 33 32" fill="none">
                                              <path
                                                  d="M5.61995 12.8V20.48H13.3V12.8H5.61995ZM15.22 10.88V22.4H3.69995V10.88H15.22ZM23.22 20.48C25.5175 20.48 27.38 18.6175 27.38 16.32C27.38 14.0225 25.5175 12.16 23.22 12.16C20.9224 12.16 19.06 14.0225 19.06 16.32C19.06 18.6175 20.9224 20.48 23.22 20.48ZM23.22 22.4C19.8625 22.4 17.14 19.6775 17.14 16.32C17.14 12.9625 19.8624 10.24 23.22 10.24C26.5775 10.24 29.2999 12.9625 29.2999 16.32C29.2999 19.6775 26.5775 22.4 23.22 22.4Z"
                                                  fill="var(--side-navbar-color)" />
                                          </svg>`
                                    }
                                    <span class="mobile-each-frame-menu-label">
                                        ${name}
                                    </span>
                                    <div class="mobile-frame-sidenav-menu-arrow">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M15.9081 7.50888C15.2696 8.11715 14.6311 8.72484 13.9927 9.33305C12.9736 10.304 11.9576 11.2726 10.9385 12.2436C10.7033 12.4678 10.4687 12.6892 10.2335 12.9135C10.1146 13.0288 9.88579 13.0288 9.76689 12.9135C9.1284 12.3052 8.48991 11.6976 7.85145 11.0893C6.83231 10.1184 5.81639 9.14975 4.79729 8.17884C4.56205 7.95457 4.32748 7.73317 4.09224 7.50888C3.80079 7.23156 4.26737 6.81239 4.55883 7.09261C5.19732 7.70087 5.83581 8.30857 6.47427 8.91678C7.49341 9.8877 8.50933 10.8564 9.52843 11.8273C9.76367 12.0516 9.76476 12.0509 10 12.2752C10.6385 11.6669 11.0439 11.2813 11.6823 10.6731C12.7015 9.70215 13.7174 8.73348 14.7365 7.76257C14.9717 7.53829 15.2063 7.3169 15.4415 7.09261C15.7298 6.81528 16.1996 7.23156 15.9081 7.50888Z" fill="black" stroke="black" stroke-width="1.5"/>
                                      </svg>
                                    </div>
                                </div>

                                <ul class="dropdown-menu mobile-frame-sidenav-dropdown-menu">
                                ${children
                                  ?.map((eachSubMenu) => {
                                    let isPathname =
                                      pathname ===
                                      (eachSubMenu?.url[
                                        eachSubMenu?.url.length - 1
                                      ] === "/"
                                        ? eachSubMenu?.url
                                        : eachSubMenu?.url + "/");

                                    return `<li>
                                    <a class="dropdown-item ${
                                      isPathname
                                        ? "selected-each-frame-submenu"
                                        : ""
                                    }" href="${eachSubMenu?.url ?? "#"}">
                                        <span class="each-mobile-frame-submenu-label">${
                                          eachSubMenu?.name
                                        }</span>
                                    </a>
                                </li>`;
                                  })
                                  .join("")}
                                </ul>
                            </div>
                        </li>`;
                      } else {
                        return `<li class="nav-item ${
                          isPathnameMatched ? "selected-each-frame-menu" : ""
                        }">
                            <a class="nav-link active w-100 d-flex align-items-center gap each-mobile-frame-link"
                            style="--gap: 16px" aria-current="#asdas" href=${url}>
                            ${
                              icon
                                ? isIconSvg
                                  ? icon
                                  : `<img src=${icon} alt=${name} width="40px" height="40px"/>`
                                : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 33 32" fill="none">
                                      <path
                                          d="M5.61995 12.8V20.48H13.3V12.8H5.61995ZM15.22 10.88V22.4H3.69995V10.88H15.22ZM23.22 20.48C25.5175 20.48 27.38 18.6175 27.38 16.32C27.38 14.0225 25.5175 12.16 23.22 12.16C20.9224 12.16 19.06 14.0225 19.06 16.32C19.06 18.6175 20.9224 20.48 23.22 20.48ZM23.22 22.4C19.8625 22.4 17.14 19.6775 17.14 16.32C17.14 12.9625 19.8624 10.24 23.22 10.24C26.5775 10.24 29.2999 12.9625 29.2999 16.32C29.2999 19.6775 26.5775 22.4 23.22 22.4Z"
                                          fill="var(--side-navbar-color)" />
                                  </svg>`
                            }
                              <span class="mobile-each-frame-menu-label">
                              ${name}
                              </span>
                            </a>
                            </li>`;
                      }
                    })
                    .join("")}
                  </div>
                </div>
                <ul class="nav frame-side-navbar complete-hidden-scroll-style">
                ${config.menu
                  ?.map(({ url, icon, name, children }) => {
                    let isIconSvg = icon?.indexOf("<svg") !== -1;
                    let excatUrl =
                      url[url.length - 1] === "/" ? url : url + "/";
                    let isPathnameMatched =
                      pathname === excatUrl ||
                      (children?.length
                        ? children?.some(
                            (submenu) =>
                              (submenu?.url[submenu?.url.length - 1] === "/"
                                ? submenu?.url
                                : submenu?.url + "/") === pathname
                          )
                        : false);
                    if (children?.length) {
                      return ` <li>
                          <div class="dropdown frame-submenu-dropdown dropend position-relative ${
                            isPathnameMatched ? "selected-each-frame-menu" : ""
                          }">
                              <div class="btn w-100 d-flex flex-column align-items-center gap each-frame-link"
                                  role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="24,0"
                                  style="--bs-btn-padding-x:0px;--bs-btn-padding-y:0px;border:0px;--gap: 4px">
                                  ${
                                    icon
                                      ? isIconSvg
                                        ? icon
                                        : `<img src=${icon} alt=${name} width="33px" height="33px"/>`
                                      : `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                            <path
                                                d="M5.61995 12.8V20.48H13.3V12.8H5.61995ZM15.22 10.88V22.4H3.69995V10.88H15.22ZM23.22 20.48C25.5175 20.48 27.38 18.6175 27.38 16.32C27.38 14.0225 25.5175 12.16 23.22 12.16C20.9224 12.16 19.06 14.0225 19.06 16.32C19.06 18.6175 20.9224 20.48 23.22 20.48ZM23.22 22.4C19.8625 22.4 17.14 19.6775 17.14 16.32C17.14 12.9625 19.8624 10.24 23.22 10.24C26.5775 10.24 29.2999 12.9625 29.2999 16.32C29.2999 19.6775 26.5775 22.4 23.22 22.4Z"
                                                fill="var(--side-navbar-color)" />
                                        </svg>`
                                  }
                                  <span class="each-frame-menu-label">
                                      ${name}
                                  </span>
                                  <div class="frame-sidenav-menu-arrow">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                          <g clip-path="url(#clip0_5530_3090)">
                                              <path
                                                  d="M5.99999 5.24758V0.747281C5.99999 -0.127468 5.44766 -0.206217 4.87705 0.364756L0.371255 4.86649C-0.285163 5.52279 -0.0136801 6 0.736506 6H5.23762C5.65209 6 6 5.66248 6 5.24761L5.99999 5.24758Z"
                                                  fill="var(--side-navbar-color)" />
                                          </g>
                                          <defs>
                                              <clipPath id="clip0_5530_3090">
                                                  <rect width="6" height="6" fill="white" />
                                              </clipPath>
                                          </defs>
                                      </svg>
                                  </div>
                              </div>

                              <ul class="dropdown-menu frame-sidenav-dropdown-menu">
                              ${children
                                ?.map((eachSubMenu) => {
                                  let isPathname =
                                    pathname ===
                                    (eachSubMenu?.url[
                                      eachSubMenu?.url.length - 1
                                    ] === "/"
                                      ? eachSubMenu?.url
                                      : eachSubMenu?.url + "/");

                                  return `<li>
                                  <a class="dropdown-item ${
                                    isPathname
                                      ? "selected-each-frame-submenu"
                                      : ""
                                  }" href="${eachSubMenu?.url ?? "#"}">
                                      <span class="each-frame-submenu-label">${
                                        eachSubMenu?.name
                                      }</span>
                                  </a>
                              </li>`;
                                })
                                .join("")}
                              </ul>
                          </div>
                      </li>`;
                    } else {
                      return `<li class="nav-item ${
                        isPathnameMatched ? "selected-each-frame-menu" : ""
                      }">
                          <a class="nav-link active w-100 d-flex flex-column align-items-center gap each-frame-link"
                          style="--gap: 4px" aria-current="#asdas" href=${url}>
                          ${
                            icon
                              ? isIconSvg
                                ? icon
                                : `<img src=${icon} alt=${name} width="33px" height="33px"/>`
                              : `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                    <path
                                        d="M5.61995 12.8V20.48H13.3V12.8H5.61995ZM15.22 10.88V22.4H3.69995V10.88H15.22ZM23.22 20.48C25.5175 20.48 27.38 18.6175 27.38 16.32C27.38 14.0225 25.5175 12.16 23.22 12.16C20.9224 12.16 19.06 14.0225 19.06 16.32C19.06 18.6175 20.9224 20.48 23.22 20.48ZM23.22 22.4C19.8625 22.4 17.14 19.6775 17.14 16.32C17.14 12.9625 19.8624 10.24 23.22 10.24C26.5775 10.24 29.2999 12.9625 29.2999 16.32C29.2999 19.6775 26.5775 22.4 23.22 22.4Z"
                                        fill="var(--side-navbar-color)" />
                                </svg>`
                          }
                            <span class="each-frame-menu-label">
                            ${name}
                            </span>
                          </a>
                          </li>`;
                    }
                  })
                  .join("")}
                </ul>
                <div class="d-flex flex-grow-1 frame-page">
                    <slot name="frame-page">
                    </slot>
                </div>
            </main>
            <div>
            <div id="drawer-backdrop" class="drawer-backdrop"></div>
            <div id="sideDrawer" class="sideDrawerContainer">
              <button type="button" class="closebtn" id="close-drawer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_5600_3662)">
                  <path d="M17.7213 1.22117L10.5168 8.42571C10.2219 8.72061 9.75409 8.72061 9.48417 8.42571L2.27865 1.22117C1.98375 0.926275 1.51593 0.926275 1.24601 1.22117C0.951112 1.51607 0.951112 1.9839 1.24601 2.25382L8.45153 9.45933C8.74643 9.75423 8.74643 10.2221 8.45153 10.492L1.22117 17.7213C0.926275 18.0162 0.926275 18.4841 1.22117 18.754C1.51607 19.0489 1.9839 19.0489 2.25382 18.754L9.45933 11.5485C9.75423 11.2536 10.2221 11.2536 10.492 11.5485L17.7213 18.7788C18.0162 19.0737 18.4841 19.0737 18.754 18.7788C19.0489 18.4839 19.0489 18.0161 18.754 17.7462L11.5736 10.5158C11.2787 10.2209 11.2787 9.7531 11.5736 9.48319L18.7791 2.27767C19.074 1.98277 19.074 1.51494 18.7791 1.24503C18.4842 0.950129 18.0173 0.950129 17.7214 1.22101L17.7213 1.22117Z" fill="black" stroke="black" stroke-width="0.4"/>
                </g>
                <defs>
                  <clipPath id="clip0_5600_3662">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
                </svg>
              </button>
              <div class="content-container">
                  <div id="profile-drawer-header" id="redirect-to-change-password" class="drawer-header">
                    Change password
                  </div>
                  <div class="server-drawer-error" id="drawer-server-error">
                
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.0609 5.5983C16.6196 4.55669 15.9871 3.62128 15.1843 2.81633C14.38 2.01348 13.4445 1.38168 12.4023 0.939756C11.3237 0.48248 10.1788 0.25 8.99893 0.25C4.17489 0.251396 0.25 4.17704 0.25 9.00107C0.25 13.8251 4.17489 17.75 8.99893 17.75C13.823 17.75 17.7479 13.8251 17.7479 9.00107C17.7479 7.82123 17.5175 6.67627 17.0602 5.59769L17.0609 5.5983ZM8.99893 16.304C4.97216 16.304 1.69657 13.0284 1.69657 9.00168C1.69657 4.97492 4.97216 1.69932 8.99893 1.69932C13.0257 1.69932 16.3013 4.97492 16.3013 9.00168C16.3013 13.0284 13.0257 16.304 8.99893 16.304Z" fill="#FBE0DD"/>
                        <path d="M11.3103 7.54624C11.5504 7.3064 11.565 6.93203 11.3402 6.69279C11.1001 6.43833 10.7107 6.43833 10.4706 6.67758L9.40599 7.74104C9.18112 7.96567 8.82158 7.96567 8.59672 7.74104L7.54735 6.69279C7.30726 6.45295 6.93249 6.43834 6.69299 6.66296C6.43827 6.9028 6.43827 7.29179 6.67777 7.53163L7.74236 8.59509C7.96723 8.81972 7.96723 9.17888 7.74236 9.4035L6.693 10.4518C6.4529 10.6916 6.43827 11.0958 6.693 11.335C6.81304 11.4397 6.96295 11.5 7.11286 11.5C7.26277 11.5 7.42791 11.4403 7.53273 11.3204L8.59732 10.257C8.82219 10.0323 9.18173 10.0323 9.40659 10.257L10.4712 11.3204C10.5912 11.4403 10.7411 11.5 10.8911 11.5C11.041 11.5 11.1909 11.4403 11.3109 11.335C11.5656 11.0952 11.551 10.691 11.3109 10.4518L10.2616 9.4035C10.0367 9.17888 10.0367 8.81972 10.2616 8.59509L11.3103 7.54624Z" fill="#FBE0DD"/>
                        </svg>
                    
                 
                      <div id="drawer-server-error-text">
                        server error
                      </div>
                    
                  </div>
                  <form id="drawer-form" action="">
                    <div id="drawer-content" class="drawer-content">
                    
                    
                      
                    </div>

                    <div class="drawer-submit">
                    <button id="submitPasswordChange" type="submit" class="submit-button">
                      Update password
                    </button>
                    </div>
                  </form>
              </div>
            </div>
            </div>

            <div class="profileDrawerContainer" tabindex="-1" id="user-profile-drawer">

              <button type="button" class="btn-close" id="close-user-profile-drawer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_2403_2581)">
                    <path d="M17.7213 1.22117L10.5168 8.42571C10.2219 8.72061 9.75409 8.72061 9.48417 8.42571L2.27865 1.22117C1.98375 0.926275 1.51593 0.926275 1.24601 1.22117C0.951112 1.51607 0.951112 1.9839 1.24601 2.25382L8.45153 9.45933C8.74643 9.75423 8.74643 10.2221 8.45153 10.492L1.22117 17.7213C0.926275 18.0162 0.926275 18.4841 1.22117 18.754C1.51607 19.0489 1.9839 19.0489 2.25382 18.754L9.45933 11.5485C9.75423 11.2536 10.2221 11.2536 10.492 11.5485L17.7213 18.7788C18.0162 19.0737 18.4841 19.0737 18.754 18.7788C19.0489 18.4839 19.0489 18.0161 18.754 17.7462L11.5736 10.5158C11.2787 10.2209 11.2787 9.7531 11.5736 9.48319L18.7791 2.27767C19.074 1.98277 19.074 1.51494 18.7791 1.24503C18.4842 0.950129 18.0173 0.950129 17.7214 1.22101L17.7213 1.22117Z" fill="black" stroke="black" stroke-width="0.4"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2403_2581">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <div class="profile-drawer-container">
                <div class="profile-left-side">
                    <div class="profile-drawer-title">
                        PROFILE
                    </div>
                    <div class="profile-name-container">
                        <div>
                            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M120 60C120 70.9524 117.066 81.2227 111.931 90.0644C111.736 90.399 111.532 90.7336 111.326 91.0682C110.848 91.8661 110.348 92.6641 109.82 93.4363C109.601 93.7581 109.382 94.0798 109.136 94.4016C101.313 105.611 89.7297 113.977 76.242 117.773C75.9588 117.851 75.6628 117.928 75.3784 118.005C70.4762 119.305 65.3153 120 60 120C39.2664 120 20.9768 109.485 10.2317 93.4878C9.21493 92.0077 8.27542 90.4633 7.41312 88.8932C2.68854 80.3218 0 70.4762 0 60C0 26.8597 26.8597 7.62939e-06 60 7.62939e-06C93.1403 7.62939e-06 120 26.8597 120 60Z"
                                    fill="#DDE2E5" />
                                <g clip-path="url(#clip0_3621_4064)">
                                    <path
                                        d="M60 0C26.9065 0 0 26.9065 0 60C0 93.0935 26.9065 120 60 120C93.0935 120 120 93.0935 120 60C120 26.9065 93.0935 0 60 0ZM60 34.3566C70.3569 34.3566 78.8185 42.8188 78.8185 53.1752C78.8185 63.532 70.3564 71.9937 60 71.9937C49.6436 71.9937 41.1815 63.5315 41.1815 53.1752C41.1815 42.8183 49.6436 34.3566 60 34.3566ZM27.1579 96.3802V93.6023C27.1579 85.6434 33.602 79.076 41.6842 79.076H78.3158C86.2747 79.076 92.8421 85.5201 92.8421 93.6023V96.3802C84.1283 104.211 72.6316 109.012 60 109.012C47.3684 109.012 35.8712 104.211 27.1579 96.3802Z"
                                        fill="#F0F3F4" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3621_4064">
                                        <rect width="120" height="120" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="profile-name-change-password-container">
                            <div class="user-name">${config?.profile?.name}</div>
                        ${
                          config?.allow_change_password
                            ? `
                            <div class="change-password-btn" id="open-password-drawer">Change Password</div>
                            `
                            : ""
                        }
                        </div>
                    </div>
                    <div class="profile-detail-container">

                        <div class="profile-detail-individual-data-container">
                            <div class="profile-detail-individual-label">
                                <div class="profile-detail-individual-label-text">
                                    User role:</div>
                            </div>
                            <div class="profile-detail-individual-label-data-container">
                                ${config?.profile?.current_role}
                            </div>
                        </div>

                        ${
                          config?.profile?.email
                            ? `<div class="profile-detail-individual-data-container">
                            <div class="profile-detail-individual-label">
                                <div class="profile-detail-individual-label-text">
                                    Email:</div>
                            </div>
                            <div class="profile-detail-individual-label-data-container">
                                ${config?.profile?.email}
                            </div>
                        </div>`
                            : ""
                        }

                        ${
                          config?.profile?.mobile_number
                            ? `<div class="profile-detail-individual-data-container">
                            <div class="profile-detail-individual-label">
                                <div class="profile-detail-individual-label-text">
                                    Mobile number:</div>
                            </div>
                            <div class="profile-detail-individual-label-data-container">
                                ${config?.profile?.mobile_number}
                            </div>
                        </div>`
                            : ""
                        }

                        ${
                          config?.profile?.other_roles.length > 0
                            ? `<div class="profile-detail-individual-data-container">
                            <div class="profile-detail-individual-label">
                                <div class="profile-detail-individual-label-text">
                                    Other roles:</div>
                            </div>
                            <div class="profile-detail-individual-label-data-container">
                                ${config?.profile?.other_roles?.map((el) => {
                                  return `<div>${el?.label}</div>`;
                                })}
                            </div>
                        </div>`
                            : ""
                        }

                        ${
                          config?.profile?.date_of_registration
                            ? `<div class="profile-detail-individual-data-container">
                            <div class="profile-detail-individual-label">
                                <div class="profile-detail-individual-label-text">
                                    Date of registration:</div>
                            </div>
                            <div class="profile-detail-individual-label-data-container">
                                ${config?.profile?.date_of_registration}
                            </div>
                        </div>`
                            : ""
                        }

                        ${
                          config?.profile?.last_login
                            ? `<div class="profile-detail-individual-data-container">
                            <div class="profile-detail-individual-label">
                                <div class="profile-detail-individual-label-text">
                                    Last login date:</div>
                            </div>
                            <div class="profile-detail-individual-label-data-container">
                                ${config?.profile?.last_login}
                            </div>
                        </div>`
                            : ""
                        }

                    </div>
                
                </div>
               
            </div>
             
            </div>
        </div>`;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Save the original fetch function
    const originalFetch = fetch;

    window.fetch = async (...args) => {
      shadowRoot.querySelector(".z-page-loader").style.visibility = "visible";
      console.log("fetching.........................");
      try {
        const response = await originalFetch(...args);
        shadowRoot.querySelector(".z-page-loader").style.visibility = "hidden";
        return response;
      } catch (error) {
        console.error("API call encountered an error:", error);
        shadowRoot.querySelector(".z-page-loader").style.visibility = "hidden";
        throw error;
      }
    };

    let shadowRoot = this.shadowRoot;

    shadowRoot
      .querySelector(".mobile-frame-side-navbar-modal")
      .addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        const hasClass = event.target.classList.contains(
          "mobile-frame-side-navbar"
        );
        if (!hasClass) {
          shadowRoot
            .querySelector(".mobile-frame-side-navbar-modal")
            .classList.remove("open");
        }
      });

    shadowRoot
      .querySelector(".open-mobile-frame-side-navbar")
      .addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        shadowRoot
          .querySelector(".mobile-frame-side-navbar-modal")
          .classList.add("open");
      });

    shadowRoot
      .querySelector(".close-mobile-frame-side-navbar")
      .addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        shadowRoot
          .querySelector(".mobile-frame-side-navbar-modal")
          .classList.remove("open");
      });

    // Side Navbar Events
    shadowRoot
      .querySelectorAll(".frame-submenu-dropdown")
      .forEach(function (frameSubMenuItem) {
        const subMenuDropdownElement = frameSubMenuItem;

        const button = frameSubMenuItem.querySelector(".each-frame-link");
        const tooltip = frameSubMenuItem.querySelector(".dropdown-menu");

        const popperInstance = Popper.createPopper(button, tooltip, {
          strategy: "fixed",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [30, 0],
              },
            },
          ],
        });
        popperInstance.setOptions({ placement: "right-start" });

        subMenuDropdownElement.addEventListener("click", function (event) {
          event.stopImmediatePropagation();
          shadowRoot
            .querySelectorAll(".dropdown-menu")
            .forEach(function (each) {
              each.style.display = "none";
            });
          shadowRoot
            .querySelectorAll(".frame-submenu-dropdown")
            .forEach(function (each) {
              each.classList.remove("focused-frame-parent-menu");
            });
          this.classList.add("focused-frame-parent-menu");
          this.querySelector(".dropdown-menu").style.display = "flex";
          popperInstance.update();
        });

        document.addEventListener("click", function (event) {
          const isClickInside = subMenuDropdownElement.contains(event.target);
          if (!isClickInside) {
            subMenuDropdownElement.querySelector(
              ".dropdown-menu"
            ).style.display = "none";
          }
        });
      });

    // Side Navbar Events
    shadowRoot
      .querySelectorAll(".mobile-frame-submenu-dropdown")
      .forEach(function (frameSubMenuItem) {
        const subMenuDropdownElement = frameSubMenuItem;

        subMenuDropdownElement.addEventListener("click", function (event) {
          event.stopImmediatePropagation();
          let isDisplayed =
            this.querySelector(".dropdown-menu")?.style?.display === "flex";
          if (!isDisplayed) {
            shadowRoot
              .querySelectorAll(".mobile-frame-sidenav-menu-arrow")
              .forEach(function (each) {
                each.classList.remove("rotate-arrow");
              });
            shadowRoot
              .querySelectorAll(".dropdown-menu")
              .forEach(function (each) {
                each.style.display = "none";
              });
            shadowRoot
              .querySelectorAll(".mobile-frame-submenu-dropdown")
              .forEach(function (each) {
                each.classList.remove("focused-frame-parent-menu");
              });
            this.classList.add("focused-frame-parent-menu");
            this.querySelector(
              ".mobile-frame-sidenav-menu-arrow"
            ).classList.add("rotate-arrow");
            this.querySelector(".dropdown-menu").style.display = "flex";
          } else {
            subMenuDropdownElement
              .querySelector(".mobile-frame-sidenav-menu-arrow")
              .classList.remove("rotate-arrow");
            subMenuDropdownElement.querySelector(
              ".dropdown-menu"
            ).style.display = "none";
          }
        });

        document.addEventListener("click", function (event) {
          const isClickInside = subMenuDropdownElement.contains(event.target);
          if (!isClickInside) {
            subMenuDropdownElement
              .querySelector(".mobile-frame-sidenav-menu-arrow")
              .classList.remove("rotate-arrow");
            subMenuDropdownElement.querySelector(
              ".dropdown-menu"
            ).style.display = "none";
          }
        });
      });

    // Profile Events
    const button = shadowRoot.querySelector(".profile-dropdown-menu-button");
    const tooltip = shadowRoot.querySelector(".profile-dropdown-menu");

    const profilePopperInstance = Popper.createPopper(button, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    profilePopperInstance.setOptions({ placement: "bottom-end" });

    const profileDropdownElement = shadowRoot.querySelector(".dropdown");

    profileDropdownElement.addEventListener("click", function (event) {
      event.stopImmediatePropagation();
      shadowRoot.querySelectorAll(".dropdown-menu").forEach(function (each) {
        each.style.display = "none";
      });
      this.querySelector(".dropdown-menu").style.display = "block";
      profilePopperInstance.update();
    });

    document.addEventListener("click", function (event) {
      const isClickInside = profileDropdownElement.contains(event.target);
      if (!isClickInside) {
        profileDropdownElement.querySelector(".dropdown-menu").style.display =
          "none";
      }
    });

    document.body.click();
    let profileData;

    shadowRoot
      .querySelector("#profile-info")
      .addEventListener("click", function () {
        var w = window.innerWidth;
        // shadowRoot.querySelector("#user-profile-drawer").style.width = "calc(100% - 88px)";
        if (w < 641) {
          shadowRoot.querySelector("#user-profile-drawer").style.width =
            "calc(100%)";
        } else {
          shadowRoot.querySelector("#user-profile-drawer").style.width =
            "calc(100% - 88px)";
        }
      });

    shadowRoot
      .querySelector("#close-user-profile-drawer")
      .addEventListener("click", function () {
        shadowRoot.querySelector("#user-profile-drawer").style.width = "0px";
      });

    shadowRoot
      .querySelector("#open-edit-drawer")
      .addEventListener("click", function () {
        shadowRoot.querySelector("#sideDrawer").style.width = "100%";
        shadowRoot.querySelector("#sideDrawer").style.maxWidth = "498px";
        shadowRoot.querySelector("#drawer-backdrop").style.display = "block";
        shadowRoot.getElementById("profile-drawer-header").innerHTML = `Edit`;
        shadowRoot.getElementById("submitPasswordChange").innerHTML = `Save`;
        drawerType = "Edit";
        shadowRoot.getElementById("submitPasswordChange").style.opacity = "1";

        shadowRoot.getElementById("drawer-content").innerHTML = `
                      <div class="form-field-container">
                        <label class="form-label" for="name">
                          Name
                        </label>
                        <input placeholder="Enter name" required id="name" type="text" class="drawer-input" />
                        <div class="drawer-error" id="edit-name-error">Please enter valid name</div>
                      </div>

                      <div class="form-field-container">
                        <label class="form-label" for="mobile">
                        Mobile
                        </label>
                        <input placeholder="Enter mobile"  id="mobile" type="text" class="drawer-input" />
                        <div class="drawer-error"  id="edit-mobile-error">Please enter valid mobile</div>
                      </div>

                      <div class="form-field-container">
                        <label class="form-label" for="email">
                          Email
                        </label>
                        <input placeholder="Enter email"  id="email" type="email" class="drawer-input" />
                        <div class="drawer-error"  id="edit-email-error">Please enter valid email</div>
                        <div class="drawer-error"  id="enter-either-email-mobile-error">You must enter either a mobile number or an email.</div>
                      </div>
             
              `;

        fetch(baseUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            profileData = data.response.profile_data;
            shadowRoot.getElementById("name").value =
              data.response.profile_data?.name;
            shadowRoot.getElementById("mobile").value =
              data.response.profile_data?.mobile;
            shadowRoot.getElementById("email").value =
              data.response.profile_data?.email;
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      });

    let openPasswordDrawerElement = shadowRoot.querySelector(
      "#open-password-drawer"
    );
    if (openPasswordDrawerElement) {
      openPasswordDrawerElement.addEventListener("click", function () {
        shadowRoot.querySelector("#sideDrawer").style.width = "100%";
        shadowRoot.querySelector("#sideDrawer").style.maxWidth = "498px";
        shadowRoot.querySelector("#drawer-backdrop").style.display = "block";
        shadowRoot.getElementById("profile-drawer-header").innerHTML =
          `Change password`;
        shadowRoot.getElementById("submitPasswordChange").innerHTML =
          `Update password`;
        drawerType = "change password";
        shadowRoot.getElementById("submitPasswordChange").style.opacity = "1";

        shadowRoot.getElementById("drawer-content").innerHTML = `
                      <div class="form-field-container">
                        <label class="form-label" for="currentPassword">
                          Current password
                        </label>
                        <input placeholder="Current password" required id="currentPassword" type="password" class="drawer-input" />
                      </div>

                      <div class="form-field-container">
                        <label class="form-label" for="newPassword">
                        New password
                        </label>
                        <input placeholder="New password" required id="newPassword" type="password" class="drawer-input" />
                        <div class="drawer-error"  id="new-password-error">Password must be at least 8 characters long, with lower and upper case letters, numbers and symbols.</div>
                      </div>

                      <div class="form-field-container">
                        <label class="form-label" for="confirmPassword">
                          Confirm password
                        </label>
                        <input placeholder="Confirm password" required id="confirmPassword" type="password" class="drawer-input" />
                        <div class="drawer-error"  id="edit-confirmPassword-error">Both password doesn't match</div>
                      </div>

              `;
      });
    }

    shadowRoot
      .querySelector("#drawer-form")
      .addEventListener("change", function () {
        if (drawerType === "Change Password") {
          if (
            shadowRoot.getElementById("currentPassword").value != "" &&
            shadowRoot.getElementById("newPassword").value != "" &&
            shadowRoot.getElementById("confirmPassword").value != ""
          ) {
            shadowRoot.getElementById("submitPasswordChange").style.opacity =
              "1";
          }
        }
      });

    shadowRoot
      .querySelector("#submitPasswordChange")
      .addEventListener("click", function (event) {
        event.stopImmediatePropagation();

        if (drawerType === "change password") {
          let passwordPattern =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if (
            !passwordPattern.test(
              shadowRoot.getElementById("newPassword").value
            )
          ) {
            shadowRoot.querySelector("#new-password-error").style.display =
              "block";
            return;
          } else {
            shadowRoot.querySelector("#new-password-error").style.display =
              "none";
          }

          if (
            passwordPattern.test(
              shadowRoot.getElementById("newPassword").value
            ) &&
            shadowRoot.getElementById("newPassword").value !==
              shadowRoot.getElementById("confirmPassword").value
          ) {
            shadowRoot.querySelector(
              "#edit-confirmPassword-error"
            ).style.display = "block";
            return;
          }

          let postData = new FormData();

          postData.append(
            "current_password",
            shadowRoot.getElementById("currentPassword").value
          );
          postData.append(
            "new_password",
            shadowRoot.getElementById("newPassword").value
          );

          let csrfToken = getCookie("csrftoken");

          fetch("/api/v1/profile/change_password/", {
            method: "PUT",
            body: postData,
            headers: {
              "X-CSRFTOKEN": csrfToken,
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              if (data.success) {
                shadowRoot.querySelector("#sideDrawer").style.width = "0px";
                shadowRoot.querySelector("#drawer-backdrop").style.display =
                  "none";
              } else {
                shadowRoot.getElementById("drawer-server-error").style.display =
                  "flex";
                shadowRoot.getElementById(
                  "drawer-server-error-text"
                ).innerHTML = data.response?.message;
              }
            })
            .catch(function (error) {
              console.error("Error:", error);
            });
        } else {
          let regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (shadowRoot.getElementById("name").value == "") {
            shadowRoot.getElementById("edit-name-error").style.display =
              "block";
            return;
          } else {
            shadowRoot.getElementById("edit-name-error").style.display = "none";
          }

          if (
            shadowRoot.getElementById("mobile").value == "" &&
            shadowRoot.getElementById("email").value == ""
          ) {
            shadowRoot.getElementById(
              "enter-either-email-mobile-error"
            ).style.display = "block";
            return;
          } else {
            shadowRoot.getElementById(
              "enter-either-email-mobile-error"
            ).style.display = "none";
          }

          if (
            profileData.mobile !== "" &&
            shadowRoot.getElementById("mobile").value === ""
          ) {
            shadowRoot.getElementById("edit-mobile-error").style.display =
              "block";
            return;
          } else {
            shadowRoot.getElementById("edit-mobile-error").style.display =
              "none";
          }

          if (
            profileData.email !== "" &&
            shadowRoot.getElementById("email").value === ""
          ) {
            if (!regex.test(shadowRoot.getElementById("email").value)) {
              shadowRoot.getElementById("edit-email-error").style.display =
                "block";
              return;
            } else {
              shadowRoot.getElementById("edit-email-error").style.display =
                "none";
            }

            return;
          }

          let postData = new FormData();

          postData.append("name", shadowRoot.getElementById("name").value);
          postData.append("mobile", shadowRoot.getElementById("mobile").value);
          postData.append("email", shadowRoot.getElementById("email").value);

          let csrfToken = getCookie("csrftoken");

          fetch(baseUrl, {
            method: "PUT",
            body: postData,
            headers: {
              "X-CSRFTOKEN": csrfToken,
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              if (data.success) {
                shadowRoot.querySelector("#sideDrawer").style.width = "0px";
                shadowRoot.querySelector("#drawer-backdrop").style.display =
                  "none";
              } else {
                shadowRoot.getElementById("drawer-server-error").style.display =
                  "flex";
                shadowRoot.getElementById(
                  "drawer-server-error-text"
                ).innerHTML = data.response?.message;
              }
            })
            .catch(function (error) {
              console.error("Error:", error);
            });
        }
      });

    shadowRoot
      .querySelector("#close-drawer")
      .addEventListener("click", function () {
        shadowRoot.getElementById("drawer-server-error").style.display = "none";
        shadowRoot.querySelector("#sideDrawer").style.width = "0px";
        shadowRoot.querySelector("#drawer-backdrop").style.display = "none";
      });
  }
}

customElements.define("z-frame", Frame);
