const updateStreamServer = async (id) => {
  try {
    console.log("Update stream server");
    const response = await fetch(
      `${process.env.STREAM_SERVER}/api/update/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export { updateStreamServer };
