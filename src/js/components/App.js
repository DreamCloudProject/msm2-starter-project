import { customElement } from "lit/decorators.js";
import { MobxLitElement } from "@adobe/lit-mobx";
import { html, css } from 'lit';
import { until } from "lit/directives/until.js";
import { translate } from "msm-components/dist/services.js";
import { LanguageSwitcher } from "msm-components/dist/components.js";
import {FontSwitcher} from "Components/FontSwitcher";
import { setLocalesPath } from "msm-components/dist/services.js";

@customElement("msm-app")
export class App extends MobxLitElement {
    static styles = css`
        /* Works on Firefox */
        * {
            scrollbar-width: thin;
            scrollbar-color: theme('colors.gray.400') theme('colors.transparent');
        }
    
        /* Works on Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
            @apply w-2 h-2;
        }
    
        *::-webkit-scrollbar-track {
            @apply bg-transparent;
        }
    
        *::-webkit-scrollbar-thumb {
            @apply rounded-3xl bg-gray-400;
        }

        .msm-app {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            gap: 0.5rem;
        }
    `;
    static properties = {
        name: { type: String },
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        setLocalesPath('/site/assets/locales/{{lng}}.json');
        this.name = "MastermindCMS";
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        return html`<div class="msm-app" part="base">
            <h1 class="title" part="title">${until(translate("greetings"))} ${this.name}!</h1>
            <msm-language-switcher></msm-language-switcher>
            <msm-font-switcher></msm-font-switcher>
        </div>
        `;
    }
}