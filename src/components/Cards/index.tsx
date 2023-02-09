import React, {FC, PropsWithChildren} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';

interface Props {
    name: string;
    url: string;
    description: string;
    image: string;
}

export function Card({name, url, description, image}: Props) {
    return <div className="col col--6 margin-bottom--lg">
        <Link className={clsx('card')} to={url}>
            {PrintImage(name, image)}
            <div className="card__body">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </Link>
    </div>;
}

function PrintImage(name, path) {
    if (path == "") {
        return
    }
    return <div className={clsx('card__image')}>
        <Image img={path} alt={`${name}'s image`}/>
    </div>
}

export const Cards: FC<PropsWithChildren> = ({children}) => {
    return <div className="row">{children}</div>;
}
