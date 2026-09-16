import { Children, isValidElement, type ComponentPropsWithoutRef } from 'react';

const columns = [
  ['1', '9', 'fontcontext', 'claims', '3', 'paint'],
  ['2', '5', 'trace', 'metallic', '12', '10'],
];

/** Independent columns keep a short widget from leaving a gap beneath it. */
export default function IndexCardLayout({ children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const cards = new Map(Children.toArray(children)
    .filter(isValidElement<{ 'data-card-id': string }>)
    .map(card => [card.props['data-card-id'], card]));

  return <div {...props}>
    {columns.map((ids, index) => <div className="index-card-column" key={index}>
      {ids.map(id => cards.get(id))}
    </div>)}
  </div>;
}
