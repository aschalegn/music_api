import artistRoutes from "./artist/artist.routes.js";
import userRoutes from "./user/user.routes.js";
import songRoutes from "./songs/song.routes.js";

export const routes = {
    artist: artistRoutes,
    user: userRoutes,
    song: songRoutes,
};