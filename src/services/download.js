class DownloadService {

  async #get_url(title) {
    const cnf = {
      method: 'POST',
      body: JSON.stringify({ title })
    };
    let req = await fetch('http://localhost:8000/get-yturl', cnf);
    return req.json();
  };

  async download(title) {
    let res = await this.#get_url(title);
    debugger   
  };



};

export { DownloadService };