import open from 'open';

export async function createLinkedInPost(status) {
    // Simulate posting to LinkedIn
    return {
        content: [
            {
                type: "text",
                text: `Posted to LinkedIn: ${status}`
            }
        ]
    };
}

export async function openWebsite(site) {
    // Map common site names to URLs
    const siteMap = {
        google: 'https://www.google.com',
        youtube: 'https://www.youtube.com',
        facebook: 'https://www.facebook.com',
        twitter: 'https://www.twitter.com',
        linkedin: 'https://www.linkedin.com',
        github: 'https://www.github.com',
        instagram: 'https://www.instagram.com',
        reddit: 'https://www.reddit.com',
        amazon: 'https://www.amazon.com',
        stackoverflow: 'https://stackoverflow.com',
    };

    let url = siteMap[site.toLowerCase()];
    if (!url) {
        // Fallback: try to open as https://<site>.com
        url = `https://${site}.com`;
        // If the user input is not a valid domain, this may fail, so as a last resort, do a Google search
        try {
            await open(url);
            return {
                content: [
                    {
                        type: "text",
                        text: `Opened website: ${url}`
                    }
                ]
            };
        } catch (e) {
            // If opening as a .com fails, do a Google search
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(site)}`;
            await open(searchUrl);
            return {
                content: [
                    {
                        type: "text",
                        text: `Searched for "${site}" in your default browser.`
                    }
                ]
            };
        }
    } else {
        await open(url);
        return {
            content: [
                {
                    type: "text",
                    text: `Opened website: ${url}`
                }
            ]
        };
    }
}