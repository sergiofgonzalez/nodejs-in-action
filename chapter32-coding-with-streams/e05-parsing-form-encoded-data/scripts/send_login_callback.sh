#!/bin/bash -e


curl 'http://localhost:5000/login/callback' \
  -H 'Connection: keep-alive' \
  -H 'Cache-Control: max-age=0' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'Origin: null' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  --data-raw 'code=0.AAAAtOpoGkyoM0it72w5DvmDjLV7jLsfSuNPoYIh3jD9kqd4AJ0.AQABAAIAAABeStGSRwwnTq2vHplZ9KL4a9YbKkHV6vAaNzvVYjH-GobzNxexhx0LNGT-X5D1ZkkCff41lSZKsxJdTcNngKB93pSpQLW69XhebCw3gJHausWD9Cu1N6j84iYQBU77fDWFNi1Fu3PEgcKlgBEM8bh3h4o0GPy7submwSZo9lnU-VJTlRWeJnSYpGIQxxpP3g8aIU90p9yV4g5tvhLrJ_DT_XuSJrRBXrYcSEXARuNVMNrBfiKD7QlGHWgs2xkYimA05CqdUjEuUs-w5_VBBJfbi2sy2UeHTB-5xN1QyTxSUJvcUHk7gvknFTiqBXD36YY3VEjVor4Vdyqpm777GoQSX6EWqLHynsC0CXLiSGiWj0md15e7WRarKDbESQNncthXq8UbVbHvTP7rREOiQaWm9yRRvgk1CCs-OwNoMxAxNHKf4z4eaNe-p0dEW_PM0tlm3x7Kv6WGxJqw-mEzVxg6rSfk6DN1RdQFK56UWGjgHIxbBamhZq8nNB6fQOoiPm6wQFcZfSeZJrdh1tpoSdIeJMUYpb7L7IA25NB_KcptZvSTpdLuOiubl5P0R44GoO14NCWVS_fDFGWlScOy8dUaPS4VToVRiMPwKmQYZOg1g-Cnu-dQMrLspp7oPzHE9w7dZxsPGUMBsM8dZb74Nq1-2Xr7OwQh4AgfNZZ0vYM_rKXm1pa64o09SF7TeU3Adz-4gFaEl6D7iZYbfL7Ww8ckj9ItaoegMWaZ1MA-iwmPrGDguoBpigCntqcFL-x2k0DRhcBxil-PKFVvTl3CAF52IAA&state=ImyRq4M7RTm5QwiulTVFzNlnKSh4bml-&session_state=08378185-1f37-4f50-974d-cb7cc51331f7' \
  --compressed