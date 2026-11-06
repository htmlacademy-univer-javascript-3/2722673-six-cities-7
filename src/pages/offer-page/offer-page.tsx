import ReviewsList from '@components/reviews-list/reviews-list';
import Map from '@components/map/map';
import Header from '@components/header/header';
import {useParams} from 'react-router-dom';
import type {DetailedOffer, Offer, Review} from '@/types/offer';
import CommentForm from '@components/comment-form/comment-form';
import OffersList from '@components/offers-list/offers-list';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import {MAX_NEARBY_OFFERS_COUNT} from '@/constants/offer';

type OfferPageProps = {
  offers: DetailedOffer[];
  nearbyOffers: Offer[];
  comments: Record<string, Review[]>;
  favoritesCount: number;
};

function OfferPage({offers, nearbyOffers, comments, favoritesCount}: OfferPageProps) {
  const {id} = useParams();
  const offer = offers.find((item) => item.id === id);

  if (!offer) {
    return <NotFoundPage />;
  }

  const offerComments = comments[offer.id] ?? [];
  const displayedNearbyOffers = nearbyOffers
    .filter((item) => item.id !== offer.id)
    .slice(0, MAX_NEARBY_OFFERS_COUNT);

  return (
    <div className="page">
      <Header favoritesCount={favoritesCount} />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button${offer.isFavorite ? ' offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.round(offer.rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">{offer.goods.map((good) => <li className="offer__inside-item" key={good}>{good}</li>)}</ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description"><p className="offer__text">{offer.description}</p></div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={offerComments} />
                <CommentForm key={offer.id} />
              </section>
            </div>
          </div>
          <Map city={offer.city} offers={displayedNearbyOffers} currentOffer={offer} variant="offer" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={displayedNearbyOffers} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

