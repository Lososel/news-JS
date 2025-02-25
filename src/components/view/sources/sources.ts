import './sources.css';
import { NewsSource } from '../../types';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) {
            throw new Error('sourceItemTemp not found.');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceCloneItemName = sourceClone.querySelector('.source__item-name');
            if (sourceCloneItemName) {
                sourceCloneItemName.textContent = item.name;
            }
            const sourceCloneItem = sourceClone.querySelector('.source__item');
            if (sourceCloneItem) {
                sourceCloneItem.setAttribute('data-source-id', item.id ?? '');
                sourceCloneItem.classList.add('hidden');
            }
            fragment.append(sourceClone);
        });

        const sourceContainer = document.querySelector('.sources');
        if (sourceContainer) {
            sourceContainer.append(fragment);
        }
        this.enableSearch();
    }

    private enableSearch(): void {
        const searchInput = document.getElementById('sourceSearch') as HTMLInputElement | null;
        if (!searchInput) return;

        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            const sourceItems = document.querySelectorAll('.source__item');

            if (searchText === '') {
                sourceItems.forEach((item) => {
                    (item as HTMLElement).classList.add('hidden');
                });
                return;
            }
            sourceItems.forEach((item) => {
                const name = item.textContent?.toLowerCase() || '';
                if (name.includes(searchText)) {
                    (item as HTMLElement).classList.remove('hidden');
                } else {
                    (item as HTMLElement).classList.add('hidden');
                }
            });
        });
    }
}

export default Sources;
