import {initializeStore} from "../store";

export const withRedux = (getServerSideProps) => async (ctx) => {
    const storeData = initializeStore();
    const result = await getServerSideProps(ctx, storeData)

    return {
        ...result,
        props: {
            initialReduxState: storeData.getState(),
            ...result.props
        }
    }
}
