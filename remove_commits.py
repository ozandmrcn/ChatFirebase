def callback(commit):
    bad_commits = {b"bba2ffb", b"5b2436c"}
    if commit.original_id in bad_commits:
        commit.skip()
