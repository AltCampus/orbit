useEffect(() => {
  (async function() {
    try {
      const res = await axios.get("/api/v1/interviews/", {
        headers: {
          Authorization: JSON.parse(localStorage.authToken)
        }
      });
      // setInterview(res.data);
    } catch (error) {
      console.error(error);
    }
  })();
}, []);
