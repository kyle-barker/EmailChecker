This project is an attempt to automate checks of email markup against [caniusemail.com](https://www.caniemail.com/) checks.

It will never replace rendering email in real user agents as the canonical check but can give guidance as part of a local dev experience.

It is uses [postcss](https://postcss.org/a), and [cheerio](https://cheerio.js.org/) (for speed) but will support other DOM parsers in time.

There are 301 checks at caniusemail.com, only 30 remain to be implemented. Checks not from caniuseemail are prefaced with "x-"

Ideally, the user agent data would be 100% up-to-date and you could run only the checks for features missing from the user agents you care about, but that is a future improvement.

./tests.xlsx was built by hand, starting from `jq -r '.data[] | [.slug, .title, .url, .test_url, .description] | @csv' caniuseemail.data.json > tests.csv`