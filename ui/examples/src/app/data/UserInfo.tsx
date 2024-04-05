import { UserInfo } from "@prt-ts/types";
import { faker } from '@faker-js/faker';
import { debounceAsync } from '@prt-ts/debounce';

let userInfo = [];

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
      arr.push(i)
    }
    return arr
  }
  

const makeUserInfo = (index: number) : UserInfo => {
    return {
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        loginName: faker.internet.userName(),
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): UserInfo[] => {
      const len = lens[depth];
      if (!len) {
        return [];
      }
      return range(len).map((d): UserInfo => {
        return {
          ...makeUserInfo(d),
        }
      })
    }
  
    return makeDataLevel()
  }

export const seedUserInfo = (len: number) => {
    userInfo = makeData(len);
}

const searchUserInfo = (searchText: string): Promise<UserInfo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userInfo.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase())));
        }, 1000);
    });
}

export const debouncedSearchUserInfo = debounceAsync(searchUserInfo, 300);