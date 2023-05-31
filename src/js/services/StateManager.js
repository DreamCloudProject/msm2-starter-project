import {makeAutoObservable, runInAction} from 'mobx';

class StateManager {
    isSidebarOpened = false;
    isCompactView = false;
    activeFont = null;

    constructor() {
        makeAutoObservable(this);

        this.initCompactView();
        this.initActiveFont();

        window.addEventListener('resize', () => {
            runInAction(() => this.isSidebarOpened = false);
        });

    }

    get isMobile() { return window.innerWidth < 1100; };
    get isDesktop() { return window.innerWidth > 1100; };
    get isCompactView() {
        return this.isCompactView;
    }
    get activeFont() { return this.activeFont; };

    initCompactView() {
        let compactViewValue = localStorage.getItem("compactView");
        this.isCompactView = (compactViewValue === 'true');
    }
    initActiveFont(){
        let defaultFont = getComputedStyle(document.documentElement)
            .getPropertyValue('--msm-theme-default-font')
            .trim().replaceAll("\"","");
        let font = localStorage.getItem("activeFont");
        this.activeFont = font ? font : defaultFont;
        this.activeFontChange(this.activeFont);
    }
    compactViewSwitch() {
        this.isCompactView = !this.isCompactView;
        localStorage.setItem("compactView",this.isCompactView.toString());
    }
    activeFontChange(font) {
        let root = document.documentElement;
        this.activeFont = font;
        root.style.setProperty('--msm-theme-font-family', `'${this.activeFont}', sans-serif`);
        localStorage.setItem("activeFont",font);
    }
    sidebarChange() {
        this.isSidebarOpened = !this.isSidebarOpened;
    }
}
export const stateManager = new StateManager();