import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'BabyPicDictionary.db',
  createFromLocation: 1,
});
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import type {AddTrack} from 'react-native-track-player';
import {db_data, seeting_db} from '../types/Genius/db';

export default class utils {
  static Categoreis = [
    {
      _id: 0,
      cate_name: 'A',
      cat_img: require('../assets/cat_image/ia.png'),
    },
    {
      _id: 1,
      cate_name: 'B',
      cat_img: require('../assets/cat_image/ib.png'),
    },
    {
      _id: 2,
      cate_name: 'C',
      cat_img: require('../assets/cat_image/ic.png'),
    },
    {
      _id: 3,
      cate_name: 'D',
      cat_img: require('../assets/cat_image/id.png'),
    },
    {
      _id: 4,
      cate_name: 'E',
      cat_img: require('../assets/cat_image/ie.png'),
    },
    {
      _id: 5,
      cate_name: 'F',
      cat_img: require('../assets/cat_image/if.png'),
    },
    {
      _id: 6,
      cate_name: 'G',
      cat_img: require('../assets/cat_image/ig.png'),
    },
    {
      _id: 7,
      cate_name: 'H',
      cat_img: require('../assets/cat_image/ih.png'),
    },
    {
      _id: 8,
      cate_name: 'I',
      cat_img: require('../assets/cat_image/ii.png'),
    },
    {
      _id: 9,
      cate_name: 'J',
      cat_img: require('../assets/cat_image/ij.png'),
    },
    {
      _id: 10,
      cate_name: 'K',
      cat_img: require('../assets/cat_image/ik.png'),
    },
    {
      _id: 11,
      cate_name: 'L',
      cat_img: require('../assets/cat_image/il.png'),
    },
    {
      _id: 12,
      cate_name: 'M',
      cat_img: require('../assets/cat_image/im.png'),
    },
    {
      _id: 13,
      cate_name: 'N',
      cat_img: require('../assets/cat_image/in.png'),
    },
    {
      _id: 14,
      cate_name: 'O',
      cat_img: require('../assets/cat_image/io.png'),
    },
    {
      _id: 15,
      cate_name: 'P',
      cat_img: require('../assets/cat_image/ip.png'),
    },
    {
      _id: 16,
      cate_name: 'Q',
      cat_img: require('../assets/cat_image/iq.png'),
    },
    {
      _id: 17,
      cate_name: 'R',
      cat_img: require('../assets/cat_image/ir.png'),
    },
    {
      _id: 18,
      cate_name: 'S',
      cat_img: require('../assets/cat_image/is.png'),
    },
    {
      _id: 19,
      cate_name: 'T',
      cat_img: require('../assets/cat_image/it.png'),
    },
    {
      _id: 20,
      cate_name: 'U',
      cat_img: require('../assets/cat_image/iu.png'),
    },
    {
      _id: 21,
      cate_name: 'V',
      cat_img: require('../assets/cat_image/iv.png'),
    },
    {
      _id: 22,
      cate_name: 'W',
      cat_img: require('../assets/cat_image/iw.png'),
    },
    {
      _id: 23,
      cate_name: 'X',
      cat_img: require('../assets/cat_image/ix.png'),
    },
    {
      _id: 24,
      cate_name: 'Y',
      cat_img: require('../assets/cat_image/iy.png'),
    },
    {
      _id: 25,
      cate_name: 'Z',
      cat_img: require('../assets/cat_image/iz.png'),
    },
  ];
  static promo = [
    {
      _id: 15,
      cate_name: 'More',
      cat_img: require('../assets/cat_image/ieflash_more.png'),
      link: 'https://babyflashcards.com/apps.html',
    },
    {
      _id: 16,
      cate_name: 'Reivew',
      cat_img: require('../assets/cat_image/ireview.png'),
      link: Platform.select({
        android:
          'https://play.google.com/store/apps/details?id=com.kidspicturedictionary',
        ios: 'https://apps.apple.com/us/app/kids-picture-dictionary-learn-english-a-z-words/id482972824',
      }),
    },
  ];

  static setupPlayer = async () => {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    } catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
      });

      isSetup = true;
    } finally {
      return isSetup;
    }
  };

  static player = async (track: AddTrack) => {
    try {
      const isSetup = await this.setupPlayer();
      if (isSetup) {
        await TrackPlayer.reset();
        await TrackPlayer.add(track);
        await TrackPlayer.play();
      }
    } catch (err) {
      console.log(err);
    }
  };
  static resetPlayer = async () => {
    const isSetup = await this.setupPlayer();
    if (isSetup) {
      await TrackPlayer.reset();
    }
  };

  static path = Platform.select({
    android: 'asset:/files/',
    ios: RNFS.MainBundlePath + '/files/',
  });
  static COLORS = {
    yellow: '#efad42',
  };
  static db = async (
    tableName: string,
    category: string | null = null,
    random: boolean = false,
    limit: number = 0,
  ) => {
    return new Promise<any>((resolve, reject) => {
      let data: any = [];
      db.transaction((tx: any) => {
        let sqlQuery = `SELECT * FROM ${tableName}`;

        if (category !== null) {
          sqlQuery += ` WHERE category = ?`;
        }

        if (random) {
          sqlQuery += ` ORDER BY RANDOM()`;
        }

        if (limit > 0) {
          sqlQuery += ` LIMIT ?`;
        }

        let params = [];
        if (category !== null) {
          params.push(category);
        }
        if (limit > 0) {
          params.push(limit);
        }

        tx.executeSql(
          sqlQuery,
          params,
          (tx: any, results: any) => {
            let len = results.rows.length;

            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              data.push(row);
            }

            resolve(data);
          },
          (err: any) => {
            console.log(err);
            reject(err);
          },
        );
      });
    });
  };

  static addIts = {
    ...Platform.select({
      android: {
        BANNER: TestIds.BANNER, //'ca-app-pub-3339897183017333/4196704788', //
        INTERSTITIAL: TestIds.INTERSTITIAL,
      },
      ios: {
        BANNER: 'ca-app-pub-3339897183017333/3825481184',
        INTERSTITIAL: 'ca-app-pub-3339897183017333/6260601584',
      },
    }),
  };

  static showAdd = () => {
    const requestOption = {
      requestNonPersonalizedAdsOnly: true,
    };

    const interstitial = InterstitialAd.createForAdRequest(
      this.addIts.INTERSTITIAL ?? '',
      requestOption,
    );

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  static updateSettings = (item: seeting_db) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE  tbl_settings set Voice=?,Random=?,' +
          'Bgsound=?,Swipe=?' +
          ' WHERE id=1',
        [item.Voice, item.Random, item.Bgsound, item.Swipe],
        (tx: any, results: any) => {
          console.log('Query completed');
        },
        (err: any) => {
          console.log(err);
        },
      );
    });
  };
  static updateRecord = (name: string, id: number) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE  tbl_items SET record_sound=? WHERE ID=?',
        [name, id],
        (tx: any, results: any) => {
          console.log('Query completed');
        },
        (err: any) => {
          console.log(err);
        },
      );
    });
  };

  static createDuplicate = (array: db_data) => {
    return new Promise<db_data>(resovle => {
      const duplicateArray = array.flatMap(item => [item, item]);
      resovle(duplicateArray);
    });
  };
  static shuffleArray = (array: db_data) => {
    return new Promise<db_data>((resolve, reject) => {
      try {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }

        resolve(shuffledArray);
      } catch (error) {
        reject(error);
      }
    });
  };
  static pickRandomOption = (array: any, length: number) => {
    return new Promise<db_data>(async (resolve, reject) => {
      try {
        if (length > array.length) {
          reject(new Error('Length exceeds the array size'));
          return;
        }

        const shuffledArray = await this.shuffleArray(array);
        const randomArray = shuffledArray.slice(0, length);

        resolve(randomArray);
      } catch (error) {
        reject(error);
      }
    });
  };
  static getMemory = async (count: number, Category: string | null) => {
    return new Promise<db_data>(async resovle => {
      const db_items = await utils.db('tbl_items', Category, true, count);
      const dup = await utils.createDuplicate(db_items);
      const data = await utils.pickRandomOption(dup, dup.length);
      resovle(data);
    });
  };

  static RightVoice = [
    {
      url: `${this.path}excellent.mp3`, // Load media from the file system
      title: 'excellent',
      artist: 'eFlashApps',
      artwork: `${this.path}excellent.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}fantastic.mp3`, // Load media from the file system
      title: 'fantastic',
      artist: 'eFlashApps',
      artwork: `${this.path}fantastic.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}goodanswer.mp3`, // Load media from the file system
      title: 'goodanswer',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}goodanswer.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}goodjob.mp3`, // Load media from the file system
      title: 'goodjob',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}goodjob.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}great.mp3`, // Load media from the file system
      title: 'great',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}great.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}marvelous.mp3`, // Load media from the file system
      title: 'marvelous',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}marvelous.mp3}`,
      duration: 2,
    },
    {
      url: `${this.path}sensational.mp3`, // Load media from the file system
      title: 'sensational',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}sensational.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}spectacular.mp3`, // Load media from the file system
      title: 'spectacular',
      artist: 'eFlashApps',
      // Load artwork from the file system:,
      artwork: `${this.path}spectacular.mp3`,
      duration: 5,
    },
  ];
  static getRandomVoice = async () => {
    const data = await this.pickRandomOption(this.RightVoice, 1);
    return data[0];
  };
}
