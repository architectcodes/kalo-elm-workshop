# npm install --global create-elm-app
# create-elm-app where-is-my-payment
# cd where-is-my-payment
git init
git add .
git commit -m 'create-elm-app'
curl https://github.com/architectcodes/kalo-elm-workshop/commit/0cef4df16cff0347be8193640abc7f78cfa71081.patch | git apply
