class FetcherService {

  async #get_url(title) {
    const cnf = {
      method: 'POST',
      body: JSON.stringify({ title })
    };
    return await fetch('http://localhost:8000/get-yturl', cnf);
  };

  async download() {
    let url = await this.#get_url();
    debugger
  };



};

export { FetcherService };