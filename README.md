# axios-throttle-interceptor

[![CI](https://github.com/shahradelahi/axios-throttle-interceptor/actions/workflows/ci.yml/badge.svg)](https://github.com/shahradelahi/axios-throttle-interceptor/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/axios-throttle-interceptor.svg)](https://www.npmjs.com/package/axios-throttle-interceptor)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
[![Install Size](https://packagephobia.com/badge?p=axios-throttle-interceptor)](https://packagephobia.com/result?p=axios-throttle-interceptor)

## 📦 Installation

```bash
npm install axios-throttle-interceptor axios
```

## 🚀 Usage

```typescript
import axios from 'axios';
import axiosThrottle from 'axios-throttle-interceptor';

const instance = axios.create();

axiosThrottle(instance, {
  limit: 5,
  interval: 1000,
  onDelay: () => console.log('Request delayed due to throttling.'),
});

instance.get('...'); // The requests are now throttled.
```

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/axios-throttle-interceptor)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi)
