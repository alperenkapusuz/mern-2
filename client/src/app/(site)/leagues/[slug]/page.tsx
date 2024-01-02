import { END_POINTS } from '@/constants/end-points';
import { ILeagueResponse } from '@/interface/response/league.interface';
import React from 'react';

async function getTeamByLeague({ params }: { params: { slug: string } }) {
  const res = await fetch(`${END_POINTS.TEAM.GET_ALL}?league=${params.slug}`);
  return res.json();
}

const page = async ({ params }: { params: { slug: string } }) => {
  const leagueData = await getTeamByLeague({ params });

  return (
    <div>
      {leagueData.data.teams.map((team: any) => (
        <div key={team._id}>
          <p>{team.name}</p>
        </div>
      ))}
    </div>
  );
};

export default page;

export async function generateStaticParams() {
  const res = await fetch(END_POINTS.LEAGUE.GET).then((res) => res.json());
  return res.data.leagues.map((league: ILeagueResponse) => ({
    slug: league.slug,
  }));
}
