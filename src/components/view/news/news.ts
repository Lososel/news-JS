import './news.css';
import { NewsArticle } from '../../types';

class News {
    public draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) {
            throw new Error("Error: '#newsItemTemp' template not found.");
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }
            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descriptionTitle = newsClone.querySelector('.news__description-title');
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }
            const descriptionSource = newsClone.querySelector('.news__description-source');
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            const descriptionContent = newsClone.querySelector('.news__description-content');
            if (descriptionContent) {
                descriptionContent.textContent = item.description ?? 'No description available';
            }

            const readMoreLink = newsClone.querySelector('.news__read-more a');
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        document.querySelector('.news')?.replaceChildren(fragment);
    }
}

export default News;
