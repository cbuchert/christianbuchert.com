export default function Glyph(props) {
    return (
        <>
            <div className={"glyph--container"}>Glyph here.</div>
            <style jsx>{`
                .glyph--container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
}