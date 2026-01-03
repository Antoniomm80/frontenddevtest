import {expect, test} from '@playwright/test';

test.describe('Header', () => {
    test('El logo debe llevar a la página principal', async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        const firstProduct = page.locator('[id*="product"]').first();
        await firstProduct.click();
        await page.waitForURL(/\/product\/.+/);

        await page.waitForTimeout(1000);
        const headerLink = page.locator('[id="header-link"]').first();
        await expect(headerLink).toBeVisible();
        await headerLink.click();

        await expect(page).toHaveURL("/");
    });

    test('El elemento nav debe tener dos elementos, el primero de ellos con un link en la página detalle', async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('[id*="product"]').first();
        await firstProduct.click();
        await page.waitForURL(/\/product\/.+/);

        await page.waitForTimeout(1000);

        const nav = page.locator('nav').first();
        await expect(nav).toBeVisible();

        const breadcrumbItems = nav.locator('li');
        await expect(breadcrumbItems).toHaveCount(3);

        const firstBreadcrumb = breadcrumbItems.first();
        const firstLink = firstBreadcrumb.locator('a').first();
        await expect(firstLink).toBeVisible();
        
        await firstLink.click();
        await expect(page).toHaveURL('/');
    });
});
