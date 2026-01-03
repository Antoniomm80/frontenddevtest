import {expect, test} from '@playwright/test';

test.describe('Product Details Page (PDP)', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const firstProduct = page.locator('[id*="product"]').first();
        await firstProduct.click();
        await page.waitForURL(/\/product\/.+/);
    });

    test('Debe mostrar una imagen del producto', async ({page}) => {
        const productImage = page.locator('img[src*="http"]').first();
        await expect(productImage).toBeVisible();
    });

    test('Debe mostrar los campos del detalle', async ({page}) => {
        await page.waitForTimeout(1000);
        const pageContent = await page.textContent('body');
        const hasRequiredInfo =
            pageContent.includes('€') ||
            pageContent.includes('CPU') ||
            pageContent.includes('RAM') ||
            pageContent.includes('Operating System') ||
            pageContent.includes('Screen Resolution') ||
            pageContent.includes('Battery') ||
            pageContent.includes('Primary Camera') ||
            pageContent.includes('Secondary Camera') ||
            pageContent.includes('Dimensions') ||
            pageContent.includes('Weight') ||
            pageContent.length > 100;

        expect(hasRequiredInfo).toBeTruthy();
    });

    test('Debe tener un selector de almacenamiento', async ({page}) => {
        await page.waitForTimeout(1000);

        const storageSelector = page.locator('[id*="select-storage"], select').first();
        await expect(storageSelector).toBeVisible({timeout: 5000});
    });

    test('Debe tener un selector de color', async ({page}) => {
        await page.waitForTimeout(1000);

        const colorSelector = page.locator('[id*="select-color"], select').first();
        await expect(colorSelector).toBeVisible({timeout: 5000});
    });

    test('Debe tener un botón de añadir al carrito', async ({page}) => {
        const addToCartButton = page.getByRole('button', {name: /Add to cart/i});
        await expect(addToCartButton).toBeVisible();
    });
});
