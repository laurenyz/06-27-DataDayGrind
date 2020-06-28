import React from 'react';
import Link from '@material-ui/core/Link';

function Resources({ stateData }) {
	const { covid19Site, covid19SiteSecondary, twitter, notes, name } = stateData;
	console.log(stateData);

	// const preventDefault = (event) => event.preventDefault();
	return (
		<div>
			<h2>{name}</h2>
			<div>
				Primary Site:
				<Link href={covid19Site} target="_blank" rel="noreferrer">
					{covid19Site}
				</Link>
			</div>
			<div>
				Secondary Site:
				<Link href={covid19SiteSecondary} target="_blank" rel="noreferrer">
					{covid19SiteSecondary}
				</Link>
			</div>
			<div>
				Twitter:
				<Link href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
					{twitter}
				</Link>
			</div>
			{notes ? <p>{notes}</p> : null}
		</div>
	);
}

export default Resources;
