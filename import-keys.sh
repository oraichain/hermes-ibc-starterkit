CONFIG_FILE=$PWD/.hermes/config.toml
echo $CONFIG_FILE
for NETWORK in $@ 
do
hermes -c $CONFIG_FILE keys add "$NETWORK" -f "scripts/${NETWORK}.json"
done