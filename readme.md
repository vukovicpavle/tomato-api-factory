# 🍅 Template

Create endpoints with ease.


## Installation

```bash
npm install @vukovicpavle/orange-template
```

## Usage

```javascript
const api = new ApiFactory({
  baseUrl: "https://jsonplaceholder.typicode.com",
  config: {
    headers: {
      "Content-Type": "application/json",
    },
  },
  onRequest: (config) => {
    console.log("onRequest", config);
    return config;
  },
  onResponse: (response) => {
    console.log("onResponse", response);
    return response;
  },
});

type Post = {
  userId: number;
  id: number;
  title: string;
};

const posts = api.createEndpoint({
  url: "/posts",
  custom: {
    getPostByUserId: (userId: number) => {
      return api.get<Post[]>(`/posts?userId=${userId}`);
    },
  },
});

posts.findAll<Post[]>().then((posts) => {
  console.log(posts);
});

posts.findOne<Post>("1").then((post) => {
  console.log(post);
});

posts.custom.getPostByUserId(1).then((posts) => {
  console.log(posts);
});
```

## API

### `ApiFactory`

#### Parameters

| Name     | Type     | Description | Required | Default |
| -------- | -------- | ----------- | -------- | ------- |
| `config` | `object` | `ApiFactory` configuration | `false` | `{}`    |

##### `config`

| Name        | Type     | Description | Required | Default |
| ----------- | -------- | ----------- | -------- | ------- |
| `baseUrl`   | `string` | Base URL for all endpoints | `false` | `""`    |
| `config`    | `object` | Axios configuration | `false` | `{}`    |
| `onRequest` | `function` | Function that is called before each request | `false` | `undefined` |
| `onResponse` | `function` | Function that is called after each response | `false` | `undefined` |

#### Returns

| Type     | Description |
| -------- | ----------- |
| `object` | Instance of `ApiFactory` |

### `Endpoint`

#### Parameters

| Name     | Type     | Description | Required | Default |
| -------- | -------- | ----------- | -------- | ------- |
| `config` | `object` | `Endpoint` configuration | `false` | `{}`    |

##### `config`

| Name        | Type     | Description | Required | Default |
| ----------- | -------- | ----------- | -------- | ------- |
| `url`   | `string` | URL for endpoint | `true` | `""`    |
| `config`    | `object` | Axios configuration | `false` | `{}`    |
| `custom` | `object` | Custom methods for endpoint | `false` | `{}` |

#### Returns

| Type     | Description |
| -------- | ----------- |
| `object` | Instance of `Endpoint` |



