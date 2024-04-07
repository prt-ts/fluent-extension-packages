import { UserInfo } from "@prt-ts/types";
import { faker } from '@faker-js/faker';
import { debounceAsync } from '@prt-ts/debounce';
import { range } from "@prt-ts/utilities";

let userInfo = [];  
  

const makeUserInfo = (index: number) : UserInfo => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
    return {
        id: index + 1,
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName),
        loginName: faker.internet.userName(firstName, lastName),
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): UserInfo[] => {
      const len = lens[depth];
      if (!len) {
        return [];
      }
      return range(1, 199).map((d): UserInfo => {
        return {
          ...makeUserInfo(d),
        }
      })
    }
  
    return makeDataLevel()
  }

  const additionalUserInfo = [
    {
      id: 10000,
      name: 'Pradeep Thapaliya',
      email: 'pradeep.thapaliya@nih.gov',
      loginName: 'pradeep.thapaliya',
    },
    {
      id: 10001,
      name: 'Durga Thapaliya',
      email: 'durga.thapaliya95@gmail.com',
      loginName: 'durga.thapaliya',
    },
    {
      id: 10002,
      name: 'Fana Goitom',
      email: 'fana.goitiom@nih.gov',
      loginName: 'fana.goitom',
    },
    {
      id: 10003,
      name: 'Mulugeta Goitom',
      email: 'mulugeta.goitom@gmail.com',
      loginName: 'mulugeta.goitom',
    },
    {
      id: 10004,
      name: 'Rukmareddy Sripathi',
      email: 'rukma.sripathi@nih.gov',
      loginName: 'rukma.sripathi',
    }
  ]

export const seedUserInfo = (len: number) => {
    userInfo = makeData(len);
    userInfo = userInfo.concat(additionalUserInfo);    
}

const searchUserInfo = (searchText: string): Promise<UserInfo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userInfo.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase())
                                              || user.email.toLowerCase().includes(searchText.toLowerCase())
                                              || user.loginName.toLowerCase().includes(searchText.toLowerCase())));
        }, 1000);
    });
}

export const debouncedSearchUserInfo = debounceAsync(searchUserInfo, 300);