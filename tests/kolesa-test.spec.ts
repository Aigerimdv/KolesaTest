import { test, expect } from '@playwright/test';

test('city-test', async ({ page }) => {
  await page.goto('https://kolesa.kz/');
  await page.getByText('Легковые').click();
  await page.getByRole('button', { name: 'Алматы' }).click();
  await page.getByRole('button', { name: 'Показать' }).click();
  await page.waitForTimeout(2000);
  const cities = page.locator('xpath=//div[@class="a-card__data"]/span[@class="a-card__param"][1]');
  const count = await cities.count();
  for (let i = 0; i < count; ++i) {
    expect(await cities.nth(i).textContent()).toMatch('Алматы');
  }
});

test('language-test', async ({ page }) => {
  await page.goto('https://kolesa.kz/');
  await page.getByRole('button', { name: 'RU ' }).click();
  await page.getByRole('link', { name: 'Қазақша' }).click();
  await expect(page.getByRole('link', { name: 'Көліктер', exact: true })).toBeVisible();
});
