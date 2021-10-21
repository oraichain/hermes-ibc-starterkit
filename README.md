# Setup local blockchain

```bash
# install hermes
cargo install ibc-relayer-cli --bin hermes --locked

# start chains
docker-compose up -d

# import keys
node scripts/create-seeds.js
./import-keys.sh Earth Mars

alias hms='hermes -c $PWD/.hermes/config.toml'

# create clients
hms tx raw create-client Earth Mars

# init connection
hms tx raw conn-init Earth Mars 07-tendermint-0 07-tendermint-0

# open connection
hms tx raw chan-open-init Earth Mars connection-0 transfer transfer

# create connection
hms create channel Earth Mars --port-a transfer --port-b transfer

# start hermes
hms start

# go to http://localhost:3000/state to check
```
