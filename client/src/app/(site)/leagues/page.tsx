import React from 'react';
import { END_POINTS } from '@/constants/end-points';
import { cookies } from 'next/headers';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ILeagueResponse } from '@/interface/response/league.interface';
import Link from 'next/link';

async function getData() {
  // const cookieStore = cookies();
  // const token = cookieStore.get('token');
  const res = await fetch(END_POINTS.LEAGUE.GET);
  return res.json();
}

const page = async () => {
  const {
    data: { leagues },
  } = await getData();

  return (
    <div className="w-full flex flex-wrap gap-3">
      {leagues.map((league: ILeagueResponse) => (
        <Link key={league._id} href={`/leagues/${league.slug}`}>
          <Card className="h-16 w-60">
            <CardHeader>
              <CardTitle>{league.name}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default page;
