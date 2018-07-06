import coinApi from '../coin';

it('Quote defaults to USD when left blank', async () => {
  expect.assertions(3);
  const data = await coinApi('BTC');
  expect(data).toHaveProperty('asset_id_base', 'BTC');
  expect(data).toHaveProperty('asset_id_quote', 'USD');
  expect(data).toHaveProperty('rate');

})

it('Quote can be whatever the user chose to be', async () => {
  expect.assertions(3);
  const data = await coinApi('BTC', 'LTC');
  expect(data).toHaveProperty('asset_id_base', 'BTC');
  expect(data).toHaveProperty('asset_id_quote', 'LTC');
  expect(data).toHaveProperty('rate');

});

it('Works for different types of crypto currencies', async () => {
  expect.assertions(1);
  const eth = await coinApi('ETH');

  expect(eth).toHaveProperty('asset_id_base','ETH');
});