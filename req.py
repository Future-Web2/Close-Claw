def ask_ollama(prompt):
    url = "http://10.13.4.243:11434/api/generate"  # <-- shu yer

    data = {
        "model": "llama3.1:8b",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(url, json=data, timeout=120)
    return response.json()["response"]