type Props = {
  msg: string;
  data?: any;
};

export function Success(props: Props): Response {
  return new Response(
    JSON.stringify({
      status: "success",
      message: props.msg,
      data: props.data,
    }),
    { status: 200 }
  );
}

export function Created(props: Props): Response {
  return new Response(
    JSON.stringify({
      status: "created",
      message: props.msg,
      data: props.data,
    })
  );
}

export function Unauthorized(props: Props): Response {
  return new Response(
    JSON.stringify({
      status: "Unauthorized",
      message: props.msg,
      data: props.data,
    }),
    { status: 401 }
  );
}

export function BadRequest(props: Props): Response {
  return new Response(
    JSON.stringify({
      status: "Bad Request",
      message: props.msg,
      data: props.data,
    }),
    { status: 400 }
  );
}
