import React from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Resources({ stateData }) {
	const { covid19Site, covid19SiteSecondary, twitter, notes } = stateData;

	// const preventDefault = (event) => event.preventDefault();

	function truncateString(str, num) {
		if (str.length <= num) {
		  return str
		}
		return str.slice(0, num) + '...'
	  }

	return (
		<div>
			<Paper style={{ padding: '20px' }}>
				<Typography align="justify">
					Primary Site:
					<Link href={covid19Site} target="_blank" rel="noreferrer">
						{truncateString(covid19Site, 120)}
					</Link>
				</Typography>
				{covid19SiteSecondary ? (
					<Typography align="justify">
						Secondary Site:
						<Link href={covid19SiteSecondary} target="_blank" rel="noreferrer">
							{truncateString(covid19SiteSecondary, 120)}
						</Link>
					</Typography>
				) : null}
				<Typography align="justify">
					Twitter:
					<Link href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
						{twitter}
					</Link>
				</Typography>
				{notes ? (
					<Typography style={{ marginTop: '10px' }} align="justify">
						{notes}
					</Typography>
				) : null}
			</Paper>
		</div>
	);
}

export default Resources;
