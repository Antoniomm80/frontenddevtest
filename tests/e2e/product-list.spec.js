import {expect, test} from '@playwright/test';

test.describe('Product List Page (PLP)', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Renderiza la lista de productos al arrancar', async ({page}) => {
        const products = page.locator('[id*="product"]').first();
        await expect(products).toBeVisible({timeout: 10000});
    });

    test('Filtra la lista al escribir en el input de búsqueda', async ({page}) => {
        await page.waitForLoadState('networkidle');

        const searchInput = page.getByPlaceholder("Search by brand or model...");
        await expect(searchInput).toBeVisible();

        await searchInput.fill('Alcatel');
        await page.waitForTimeout(500);

        const productTexts = await page.locator('[id*="product"]').allTextContents();
        const hasMatchingResults = productTexts.some(text =>
            text.toLowerCase().includes('alcatel')
        );
        expect(hasMatchingResults).toBeTruthy();
    });


    test('Navega a la página detalle cuando se hace click en algún elemento', async ({page}) => {
        await page.waitForLoadState('networkidle');
        const firstProduct = page.locator('[id*="product"]').first();
        await firstProduct.click();
        await expect(page).toHaveURL(/\/product\/.+/);
    });
});
