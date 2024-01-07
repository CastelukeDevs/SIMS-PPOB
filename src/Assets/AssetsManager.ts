// export default {
//   Banner: require('./Banner1.png'),
//   Logo: require('./Logo.png'),
// };

const Assets = {
  'Banner-1': require('./Banner-1.png'),
  'Banner-2': require('./Banner-2.png'),
  'Banner-3': require('./Banner-3.png'),
  'Banner-4': require('./Banner-4.png'),
  'Banner-5': require('./Banner-5.png'),
  'Icon-Data': require('./Icon-Data.png'),
  'Icon-Game': require('./Icon-Game.png'),
  'Icon-Kurban': require('./Icon-Kurban.png'),
  'Icon-Listrik': require('./Icon-Listrik.png'),
  'Icon-Makanan': require('./Icon-Makanan.png'),
  'Icon-Musik': require('./Icon-Musik.png'),
  'Icon-PBB': require('./Icon-PBB.png'),
  'Icon-PDAM': require('./Icon-PDAM.png'),
  'Icon-PGN': require('./Icon-PGN.png'),
  'Icon-Pulsa': require('./Icon-Pulsa.png'),
  'Icon-Televisi': require('./Icon-Televisi.png'),
  'Icon-Zakat': require('./Icon-Zakat.png'),
  'Logo-Logo': require('./Logo-Logo.png'),
  'Profile-L': require('./Profile-L.png'),
  'Profile-S': require('./Profile-S.png'),
};

type IAssets = keyof typeof Assets;

/**
 * Get Asset image from Assets folder
 * @param name Assets Name
 * @returns Asset Image Source
 * @example getAssets('Logo-Logo')
 */
export default (name: IAssets) => Assets[name];
