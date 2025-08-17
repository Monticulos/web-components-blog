import { EntryManager } from "./EntryManager.js";

const TEST_PASS = "PASS:";
const TEST_FAIL = "FAIL:";

function assertEqual(expected, actual) {
    const ASSERT_EQUAL_MESSAGE = `Expected '${expected}' to equal actual '${actual}'.`
    if (expected === actual) {
        console.log(TEST_PASS, ASSERT_EQUAL_MESSAGE);
    } else {
        console.log(TEST_FAIL, ASSERT_EQUAL_MESSAGE);
    }
}

function assertGreaterThan(numberToCompare, actualNumber) {
    const ASSERT_GREATER_THAN_MESSAGE = `Expected actual ${actualNumber} to be greater than ${numberToCompare}.`
    if (actualNumber > numberToCompare) {
        console.log(TEST_PASS, ASSERT_GREATER_THAN_MESSAGE);
    } else {
        console.log(TEST_FAIL, ASSERT_GREATER_THAN_MESSAGE);

    }
}

(async function getEntries_getsAllEntries() {
    const entries = await EntryManager.getEntries();
    assertGreaterThan(1, entries.length);
})();

(async function getEntry_getsEntry_fromGivenSlug() {
    const slug = "velkommen-til-bloggen";
    const entry = await EntryManager.getEntry(slug);
    assertEqual(slug, entry.slugs[0])
})();

(async function getLatestEntry_getsLatestEntry() {
    const entry = await EntryManager.getLatestEntry();
    assertEqual("2025-08-16.js", entry.sourceFile);
})();