import os

def collect_files_contents(root_dir, output_file):
    script_name = os.path.basename(__file__)
    with open(output_file, 'w', encoding='utf-8', errors='replace') as out:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Remove .venv and __pycache__ from traversal
            if 'node_modules' in dirnames:
                dirnames.remove('node_modules')
            if 'svg' in dirnames:
                dirnames.remove('svg')
            if '.git' in dirnames:
                dirnames.remove('.git')

            for filename in filenames:
                # Skip the script file itself
                if filename == script_name:
                    continue

                filepath = os.path.join(dirpath, filename)

                out.write("=== FILE START: {} ===\n".format(os.path.relpath(filepath, root_dir)))
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
                        content = f.read()
                    out.write(content)
                except Exception as e:
                    # If reading fails, write the error message
                    out.write("[Error reading file: {}]\n".format(e))
                out.write("\n=== FILE END: {} ===\n\n".format(os.path.relpath(filepath, root_dir)))


if __name__ == "__main__":
    # Always use the current directory as the directory to scan
    directory_to_scan = "src"
    output_filename = "output.txt"
    collect_files_contents(directory_to_scan, output_filename)
    print("Completed writing files and contents to", output_filename)