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
            }
            fragment.append(sourceClone);
        });

        const sourceContainer = document.querySelector('.sources');
        if (sourceContainer) {
            sourceContainer.append(fragment);
        }
    }
}

export default Sources;
