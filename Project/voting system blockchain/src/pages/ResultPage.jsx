import React, { useEffect, useState } from "react";
import { Alert, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

const Result = ({
    voting,
    setLoading,
    getBallotDetails,
    state,
    ballot,
    choices,
    getChoices,
    getCurrentState,
    contract,
    setContract,
}) => {
    const [result, setResult] = useState([]);

    const getResult = async (choice) => {
        const vote = await voting.methods.getVote(choice).call();
        return parseInt(vote);
    };

    const getAllResult = async () => {
        setLoading(true);
        let votes = [];
        for (let i = 0; i < choices.length; i++) {
            const ele = choices[i];
            const res = await getResult(ele);
            votes.push({ name: ele, vote: res });
        }
        setResult(votes);
        setLoading(false);
    };

    useEffect(() => {
        if (contract && ballot.address) {
            getChoices();
            getCurrentState();
        }
    }, [getChoices, ballot, contract, getCurrentState]);

    return (
        <Container>
            <Box my={2}>
                <Paper>
                    <Box py={1}>
                        <Typography variant="h4" fontWeight="bold" textAlign="center">
                            Get Election
                        </Typography>
                    </Box>
                    <Divider />
                    <Box margin={2} paddingY={2}>
                        <form onSubmit={getBallotDetails}>
                            <Box my={2}>
                                <TextField
                                    value={contract}
                                    name="name"
                                    id="outlined-basic"
                                    label="Election Address"
                                    variant="outlined"
                                    onChange={(e) => setContract(e.target.value)}
                                    fullWidth
                                />
                            </Box>
                            {ballot.name && ballot.address && ballot.proposal && (
                                <Box my={2} display="flex" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Election Name
                                        </Typography>
                                        <Typography>{ballot.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Proposal
                                        </Typography>
                                        <Typography>{ballot.proposal}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Election Address
                                        </Typography>
                                        <Typography>{ballot.address}</Typography>
                                    </Box>
                                </Box>
                            )}
                            {state === 1 && (
                                <Box mb={2}>
                                    <Alert severity="warning">Voting hasn't ended yet.</Alert>
                                </Box>
                            )}
                            <Box>
                                <Button variant="contained" type="submit" fullWidth
                                sx={{
                                    backgroundColor: "green",
                                    color: "white", // Ensure text is readable on green and black backgrounds
                                    transition: "background-color 0.3s ease", // Smooth transition
                                    "&:hover": {
                                      backgroundColor: "black",
                                    },
                                  }}
                                >
                                    Get Election
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>

                {state === 2 && (
                    <Paper>
                        <Box padding={2} pb={0}>
                            <Box py={1}>
                                <Typography variant="h4" fontWeight="bold" textAlign="center">
                                    Result
                                </Typography>
                            </Box>
                            <Box py={2}>
                                <Button variant="contained" type="submit" fullWidth onClick={getAllResult}
                                sx={{
                                    backgroundColor: "green",
                                    color: "white", // Ensure text is readable on green and black backgrounds
                                    transition: "background-color 0.3s ease", // Smooth transition
                                    "&:hover": {
                                      backgroundColor: "black",
                                    },
                                  }}
                                >
                                    Get Election Result
                                </Button>
                            </Box>
                            {result?.length !== 0 && (
                                <>
                                    <Divider />
                                    <Box margin={2} paddingY={2} display="flex" justifyContent="space-between">
                                        {result.map((val, ind) => {
                                            return (
                                                <Box key={ind}>
                                                    <Typography variant="h6" fontWeight="bold">
                                                        {val?.name}
                                                    </Typography>
                                                    <Typography>{val?.vote}</Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};

export default Result;
