import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface Props {
  name: string;
  url: string;
  description: string;
}

export function Card({name, url, description}: Props) {
  return (
    <div className="col col--6 margin-bottom--lg">
      <Link className={clsx('card')} to={url}>
        <div className="card__body">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export const Cards: FC<PropsWithChildren> = ({ children }) => {
  return <div className="row">{children}</div>;
}
