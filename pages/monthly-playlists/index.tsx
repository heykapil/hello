import Link from "next/link";
import { SimplifiedPlaylist } from "spotify-types";
import useSWR from "swr";
import { fetcher } from "lib/fetcher";

const MonthyPlaylistPage = () => {
  const { data: monthlyPlaylists } = useSWR<SimplifiedPlaylist[]>(
    "/api/playlists/monthly",
    fetcher
  );

  return (
    <section className="max-w-screen relative mx-auto mb-14 px-6 py-12">
      <div className="mb-4 max-w-md">
        <p className="mb-1">I like to curate music.</p>
        <p>
          Every month I create a playlist. It helps me discover new songs and
          artists, as well as recall certain feelings and memories from the
          past.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {monthlyPlaylists?.map((playlist: any) => {
          return (
            <div key={playlist.id}>
              <Link href={`/monthly-playlists/${playlist.id}`}>
                <a className="flex flex-col items-center gap-2">
                  <img
                    src={playlist.images[0].url}
                    className="h-48 w-full rounded-lg object-cover shadow-md"
                  />
                  <span>{playlist.name}</span>
                </a>
              </Link>
            </div>
          );
        }) || <p>loading...</p>}
      </div>
    </section>
  );
};

export default MonthyPlaylistPage;
