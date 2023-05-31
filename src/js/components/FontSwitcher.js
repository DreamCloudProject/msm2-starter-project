import { LitElement, html, css } from 'lit';
import { Select, SelectItem } from "msm-components/dist/components.js";
import { stateManager } from "Services/StateManager";
import {customElement} from "lit/decorators.js";

@customElement("msm-font-switcher")
export class FontSwitcher extends LitElement {
    static properties = {
        fonts: { type: Array, state: true }
    };
    static styles = css``;
    constructor() {
        super();
        this.fonts = [
            "Arimo",
            "Istok Web",
            "Jost",
            "Inter",
            "Manrope",
            "Source Sans Pro",
            "Nunito Sans",
            "Overpass",
            "Fira Sans",
            "Rubik"
        ];
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<msm-select type="OUTLINE" variant="primary" value="${stateManager.activeFont}" @change="${(e) => this.handleFontChange(e) }">
            ${this.fonts?.map(font => html`<msm-select-item value="${font}"><span>${font}</span></msm-select-item>`)}
        </msm-select>`;
    }

    handleFontChange(e) {
        stateManager.activeFontChange(e.currentTarget.value);
    }
}