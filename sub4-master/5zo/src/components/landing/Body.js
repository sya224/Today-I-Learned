import { Route } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import React from 'react';
import Container from '@material-ui/core/Container';
import {
    Provider, Heading, Subhead, Flex, Box
} from 'rebass'
import {
    Hero
} from 'react-landing-page'
import "./FontIndex.css"
import intro1 from "./Font/intro1.PNG"
import intro2 from "./Font/intro2.PNG"
import intro3 from "./Font/intro3.PNG"
import intro4 from "./Font/intro4.PNG"
import "./landing.css"

import ReactPlayer from 'react-player'
class Body extends React.Component {
    drawRouter() {
        return (
            <div>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </div>
        );
    }
    render() {
        return (
            <Provider className="landing">
                <Hero  backgroundImage="https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_1280.jpg">
                    
                    <Flex mt={3}>
                        <Flex alignItems='flex-start' width={[1, 1, 1 / 2]} p={3}>
                            <Box width={[1, 1, 1 / 2]} p={4}>
                                <ReactPlayer url='https://www.youtube.com/watch?v=d31WO2zAV1E' playing />
                            </Box>
                        </Flex>
                        <Box width={[1, 1, 1 / 2]} p={4}>
                            <Register location={this.props.location} />
                        </Box>
                    </Flex>

                </Hero>
                <Hero
                    bg='white'
                    bgOpacity={0.5}
                >
                    <Container>
                        <Flex flexWrap='wrap' alignItems='center'>
                            <Flex alignItems='flex-start' width={[1, 1, 1 / 2]} p={3}>
                                <Box width={[1, 1, 1 / 2]} p={4}>
                                    <div>
                                        <img src={intro1} height="250" width="300" alt="intro1"></img>
                                    </div>
                                </Box>
                            </Flex>
                            <Box width={[1, 1, 1 / 2]} p={3} >
                                <Heading textAlign='center'>내가 작성한 곳을 한번에!</Heading>
                                <Subhead textAlign='center'>사용자의 TIL기록을 날짜와 활동량을 통해 볼 수 있어요</Subhead>
                                <Flex mt={3} flexWrap='wrap' justifyContent='center'>
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex flexWrap='wrap' alignItems='center'>

                            <Flex alignItems='flex-start' width={[1, 1, 1 / 2]} p={3}>
                                <Box width={[1, 1, 1 / 2]} p={4}>
                                    <div>
                                        <img src={intro2} height="250" width="300" alt="intro2"></img>
                                    </div>
                                </Box>
                            </Flex>
                            <Box width={[1, 1, 1 / 2]} p={3} >
                                <Heading textAlign='center'>TIL을 편하게!</Heading>
                                <Subhead textAlign='center'>오늘 내가 배울 것과 미래에 내가 계획한 것을 드래그 엔 드롭으로 쉽게 작성할 수 있어요</Subhead>
                                <Flex mt={3} flexWrap='wrap' justifyContent='center'>
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex flexWrap='wrap' alignItems='center'>
                            <Flex alignItems='flex-start' width={[1, 1, 1 / 2]} p={3}>
                                <Box width={[1, 1, 1 / 2]} p={4}>
                                    <div>
                                        <img src={intro3} height="250" width="300" alt="intro3"></img>
                                    </div>
                                </Box>
                            </Flex>
                            <Box width={[1, 1, 1 / 2]} p={3} >
                                <Heading textAlign='center'>달력으로 한번에!</Heading>
                                <Subhead textAlign='center'>내가 지금까지 작성한 기록을 달력으로 확인할 수 있어요</Subhead>
                                <Flex mt={3} flexWrap='wrap' justifyContent='center'>
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex flexWrap='wrap' alignItems='center'>

                            <Flex alignItems='flex-start' width={[1, 1, 1 / 2]} p={3}>
                                <Box width={[1, 1, 1 / 2]} p={4}>
                                    <div>
                                        <img src={intro4} height="250" width="300" alt="intro4"></img>
                                    </div>
                                </Box>
                            </Flex>
                            <Box width={[1, 1, 1 / 2]} p={3} >
                                <Heading textAlign='center'>다른사람이 궁금하다면</Heading>
                                <Subhead textAlign='center'>다른 사용자의 글을 찾아보고 배울 수 있어요</Subhead>
                                <Flex mt={3} flexWrap='wrap' justifyContent='center'>
                                </Flex>
                            </Box>
                        </Flex>
                    </Container>

                </Hero>
            </Provider>

        )
    }
}

export default Body