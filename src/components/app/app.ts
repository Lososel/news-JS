import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector('.sources') as HTMLElement | null;
        if (!sources) {
            throw new Error("Error: '.sources' element not found in the DOM.");
        }
        sources.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
